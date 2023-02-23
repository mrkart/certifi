import { isEmpty } from 'class-validator';
import { randomBytes } from 'crypto';
import { existsSync, PathLike } from 'fs';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import { CreateCertificateDTO, CreateUserDTO, UpdateUserDTO } from '../dtos';
import { UnhandledError } from '../errors';
import {
    AccountCreatedEventData,
    CertificateMetadata,
    ListResponse,
    OrgUser,
    OrgUserResponse,
    Profile,
    TransactionEvent,
    Utility
} from '../helpers';
import MailTransporterFactory from '../helpers/transporter';
import { OrgUserInviationMail } from '../mail/org-user-invitation-mail';
import { Org } from '../models/entities/Org';
import { User } from '../models/entities/User';
import OrgRepository from '../models/repositories/org-repository';
import SlotRepository from '../models/repositories/SlotRepository';
import { UserRepository } from '../models/repositories/user-repository';
import fclService, { FclService } from './fcl-service';
import pdfService, { PdfService } from './pdf-service';

export class UserService {
    constructor(
        private fclService: FclService,
        private pdfService: PdfService
    ) {}
    public async getProfile(userId: number): Promise<Profile> {
        const profile = await UserRepository.findProfile(userId);
        return profile;
    }

    public async createOrgUser(
        orgId: number,
        request: CreateUserDTO
    ): Promise<OrgUserResponse> {
        const user = await UserRepository.createOrgUser(request, orgId);
        this.dispatchInvitation(user);
        this.createAndSetupWallet(user);
        return {
            email: user.email,
            id: user.id,
            name: user.name,
            organistaions: user.organistaions,
            phone: user.phone,
            roles: user.roles,
            slot: user.slot
        };
    }

    public async getOrgUsers(
        orgId: number
    ): Promise<ListResponse<OrgUserResponse>> {
        const { count, entity: users } = await UserRepository.findOrgUsers(
            orgId
        );

        const orgUsers: OrgUserResponse[] = users.map((user) => {
            return {
                email: user.userEmails[0].email,
                id: user.id,
                name: user.name,
                organistaions: user.orgRoles
                    .filter((orgRole) => orgRole.orgId === orgId)
                    .map((orgRole) => {
                        return {
                            id: orgRole.orgId,
                            name: orgRole.org.orgName
                        };
                    }),
                phone: user.phone,
                roles: user.orgRoles
                    .filter((orgRole) => orgRole.orgId === orgId)
                    .map((orgRole) => {
                        return {
                            id: orgRole.id,
                            name: orgRole.accessType
                        };
                    }),
                slot: user.slotHasUsers
                    .filter((slotHasUser) => slotHasUser?.slot?.orgId === orgId)
                    .map((slotHasUser) => {
                        return {
                            id: slotHasUser.id,
                            name: slotHasUser.slot.slotTitle
                        };
                    })
            };
        });
        return new ListResponse(count, orgUsers);
    }

    public async updateOrgUser(
        orgId: number,
        userId: number,
        request: UpdateUserDTO
    ): Promise<OrgUserResponse> {
        const rs = await UserRepository.updateOrgUser(orgId, userId, request);
        return {
            email: undefined,
            id: rs.id,
            name: rs.name,
            phone: rs.phone,
            organistaions: undefined,
            roles: undefined,
            slot: undefined
        };
    }

    public async getOrgUser(
        orgId: number,
        userId: number
    ): Promise<OrgUserResponse> {
        const user = await UserRepository.findOrgUserById(userId, orgId);
        return {
            email: user.userEmails[0].email,
            id: user.id,
            name: user.name,
            organistaions: user.orgRoles
                .filter((orgRole) => orgRole.orgId === orgId)
                .map((orgRole) => {
                    return {
                        id: orgRole.orgId,
                        name: orgRole.org.orgName
                    };
                }),
            phone: user.phone,
            roles: user.orgRoles
                .filter((orgRole) => orgRole.orgId === orgId)
                .map((orgRole) => {
                    return {
                        id: orgRole.id,
                        name: orgRole.accessType
                    };
                }),
            slot: user.slotHasUsers
                .filter((slotHasUser) => slotHasUser?.slot?.orgId === orgId)
                .map((slotHasUser) => {
                    return {
                        id: slotHasUser.id,
                        name: slotHasUser.slot.slotTitle
                    };
                })
        };
    }

    public async createCertificate(
        orgId: number,
        userId: number,
        data: CreateCertificateDTO
    ): Promise<string> {
        const org = await OrgRepository.findById(orgId);
        const user = await UserRepository.findOrgUserById(userId, orgId);
        const outDir = resolve(
            `./generated_files/preview/org/${org.id}/certificates`
        );
        return this.generateCertificateFile(org, user, data, outDir);
    }

    private async generateCertificateFile(
        org: Org,
        user: User,
        data: CreateCertificateDTO,
        outDir: PathLike
    ): Promise<string> {
        const templatePath = resolve('./templates/certificates/template1.pdf');
        const slot = await SlotRepository.findOneBy({
            id: data.slotId
        });
        if (existsSync(outDir) === false) {
            await mkdir(outDir, { recursive: true });
        }
        const fileName: string =
            `${org.id}_${user.id}_` + randomBytes(4).toString('hex') + '.pdf';
        const outPath: string = `${outDir}/${fileName}`;
        await this.pdfService.createCertificate(
            {
                batchName: slot.slotTitle,
                certificateNumber: data.certificateNumber,
                courseName: data.courseName,
                grade: data.grade,
                instituionName: org.orgName,
                name: user.name
            },
            templatePath,
            outPath
        );
        return outPath;
    }

    // private async generateCertificateMetadata(
    //     orgId: number,
    //     user: User
    // ): Promise<CertificateMetadata> {
    //     const org = await OrgRepository.findById(orgId);

    // }

    private async dispatchInvitation(user: OrgUser) {
        const invite = new OrgUserInviationMail(
            {
                orgName: user.organistaions[0].name,
                password: user.password,
                receipientAddress: user.email,
                recipientFirstName: user.name
            },
            MailTransporterFactory.createTransporter()
        );
        try {
            await Utility.retryPromise(
                async () => {
                    await invite.sendMail();
                },
                5,
                1000,
                'Retrying to send email invitation...'
            );
        } catch (e) {
            console.error('Error: Failed to send message', e);
        }
    }

    private async createAndSetupWallet(orgUser: OrgUser): Promise<void> {
        try {
            const user = await UserRepository.findOneBy({
                id: orgUser.id
            });
            if (isEmpty(user)) {
                throw new UnhandledError(
                    new Error('Could not find user for id: ' + orgUser.id)
                );
            }
            const userTx = await this.fclService.createUser(0);
            // console.log('User creation\n', JSON.stringify(userTx, null, 4));
            console.log('✓ Account created');
            const flowAccountCreatedEvt: TransactionEvent<AccountCreatedEventData> =
                userTx.events.find(
                    (evt) => evt.type === 'flow.AccountCreated'
                ) as TransactionEvent<AccountCreatedEventData>;
            if (isEmpty(flowAccountCreatedEvt)) {
                throw new UnhandledError(
                    new Error(
                        'User creation tx response ' +
                            'did not contain event "flow.AccountCreated"'
                    )
                );
            }
            const { address } = flowAccountCreatedEvt.data;
            user.flowAddress = address;
            await UserRepository.save(user);
            const tokenTransferRs = await fclService.transferFlowToken(
                0,
                1,
                address
            );
            // console.log(
            //     'Transfer token response\n',
            //     JSON.stringify(tokenTransferRs, null, 4)
            // );
            console.log('✓ Flow Token transferred');
            const setupAccountStatus = await this.fclService.setupAccount(
                0,
                address
            );
            // console.log(
            //     'Flow account setup\n',
            //     JSON.stringify(setupAccountStatus, null, 4)
            // );
            console.log('✓ Collection created');
            user.flowAccSetupStatus = 1;
            await UserRepository.save(user);
        } catch (e) {
            // console.error(e);
            console.error(
                JSON.stringify(
                    e,
                    (key, val) => {
                        if (val instanceof Error) {
                            var error = {};

                            Object.getOwnPropertyNames(val).forEach(function (
                                propName
                            ) {
                                error[propName] = val[propName];
                            });

                            return error;
                        }

                        return val;
                    },
                    4
                )
            );
        }
    }
}

const userService = new UserService(fclService, pdfService);
export default userService;
