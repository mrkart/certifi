import { isEmpty, isNotEmpty } from 'class-validator';
import { randomBytes } from 'crypto';
import { createReadStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { basename, resolve } from 'path';
import { Readable } from 'stream';
import { CreateCertificateDTO, CreateUserDTO, UpdateUserDTO } from '../dtos';
import { ErrorDetail, InvalidRequestError, UnhandledError } from '../errors';
import {
    AccountCreatedEventData,
    CertificateMetadata,
    CertificateResponse,
    IpfsAccessRequest,
    IpfsAccessToken,
    IpfsUploadResponse,
    ListResponse,
    MintEventData,
    OrgUser,
    OrgUserResponse,
    Profile,
    TransactionEvent,
    TransactionStatusObject,
    Utility
} from '../helpers';
import { getContentLength, post, postForm } from '../helpers/http';
import MailTransporterFactory from '../helpers/transporter';
import { OrgUserInviationMail } from '../mail/org-user-invitation-mail';
import { Org } from '../models/entities/Org';
import { Slot } from '../models/entities/Slot';
import { User } from '../models/entities/User';
import OrgRepository from '../models/repositories/org-repository';
import SlotRepository from '../models/repositories/SlotRepository';
import { UserRepository } from '../models/repositories/user-repository';
import fclService, { FclService } from './fcl-service';
import pdfService, { PdfService } from './pdf-service';
import FormData from 'form-data';
import getDataSource from '../config/datasource';
import { AccessType, OrgRoles } from '../models/entities/OrgRoles';
import { Certificate } from '../models/entities/Certificate';
import { UserEmail } from '../models/entities/UserEmail';
import CourseRepoistory from '../models/repositories/course-repository';
import { Not, IsNull } from 'typeorm';

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
        this.createAndSetupWallet(user).then(
            () => {},
            () => {}
        );
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
                            id: slotHasUser.slot.id,
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
            flowAddress: user.flowAddress,
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
                        id: slotHasUser.slot.id,
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
        const slot = await SlotRepository.findOneBy({
            id: data.slotId
        });
        const outDir = resolve(
            `./generated_files/preview/org/${org.id}/certificates`
        );
        const certPath = await this.generateCertificateFile(
            org,
            user,
            slot,
            data,
            outDir
        );
        return certPath;
    }

    public async getUserCertificates(
        orgId: number,
        userId: number
    ): Promise<ListResponse<CertificateResponse>> {
        const certList = await UserRepository.findOrgUserCertificates(
            userId,
            orgId
        );
        const certRes: CertificateResponse[] = certList.entity.map((cert) => {
            return {
                certificateHash: cert.certificateHash,
                certificateNumber: cert.certificateNumber,
                course: {
                    id: cert.course.id,
                    name: cert.course.name
                },
                datetimeCreated: cert.datetimeCreated,
                email: cert.userEmail.email,
                grade: cert.grade,
                id: cert.id,
                nftId: cert.nftId,
                org: {
                    id: cert.org.id,
                    name: cert.org.orgName
                },
                slot: {
                    id: cert.slot.id,
                    name: cert.slot.slotTitle
                },
                thumbnailPath: cert.thumbnailFileName
                    ? `/api/certificates/img-preview/${cert.thumbnailFileName}`
                    : null
            };
        });
        return new ListResponse(certList.count, certRes);
    }

    public async mintCertificate(
        orgId: number,
        userId: number,
        data: CreateCertificateDTO
    ) {
        const org = await OrgRepository.findById(orgId);
        const user = await UserRepository.findOrgUserById(userId, orgId);
        const slot = await SlotRepository.findOneByOrFail({
            id: data.slotId
        });
        if (user.flowAddress === null) {
            throw new InvalidRequestError(
                'Selected user does not contain a flow account associated with them.',
                'Invalid User id',
                [
                    [
                        'User must hav flow account associated with them to mint certificate'
                    ]
                ]
            );
        }
        const preparer = await getDataSource()
            .getRepository(OrgRoles)
            .findOneOrFail({
                where: {
                    orgId: org.id,
                    accessType: AccessType.PREPARER,
                    user: {
                        flowAddress: Not(IsNull())
                    }
                },
                relations: {
                    user: true
                }
            });
        const verifier = await getDataSource()
            .getRepository(OrgRoles)
            .findOneOrFail({
                where: {
                    orgId: org.id,
                    accessType: AccessType.VERIFIER,
                    user: {
                        flowAddress: Not(IsNull())
                    }
                },
                relations: {
                    user: true
                }
            });
        const issuer = await getDataSource()
            .getRepository(OrgRoles)
            .findOneOrFail({
                where: {
                    orgId: org.id,
                    accessType: AccessType.ISSUER,
                    user: {
                        flowAddress: Not(IsNull())
                    }
                },
                relations: {
                    user: true
                }
            });
        const outDir = resolve(
            `./generated_files/mint/org/${org.id}/certificates`
        );
        const thumbnailOutDir = resolve(
            `./generated_files/mint/org/${org.id}/certificates/thumbnails`
        );
        const certPath = await this.generateCertificateFile(
            org,
            user,
            slot,
            data,
            outDir
        );
        // const certThumbnailPath = await this.generateCertificateThumbnail(
        //     certPath,
        //     thumbnailOutDir
        // );
        const acessToken = await this.getIpfsAuthToken();
        console.log('✔ Ipfs accessToken');
        const certStream = createReadStream(certPath);
        const uploadResponse = await this.uploadToIpfs(
            acessToken,
            certStream,
            basename(certPath)
        );
        console.log('✔ Uploader certificate');
        const ipfsEnpoint = 'https://ipfs.perma.store/content';
        const metadta = await this.generateCertificateMetadata(
            org,
            user,
            slot,
            `${ipfsEnpoint}/${uploadResponse.Hash}`,
            data,
            [preparer.user, verifier.user, issuer.user]
        );

        const metadataStream = Readable.from([
            JSON.stringify(metadta, null, 2)
        ]);
        const metadataUploadResponse = await this.uploadToIpfs(
            acessToken,
            metadataStream,
            randomBytes(4).toString('hex') + '.json'
        );
        console.log('✔ Metadata JSON uploaded');
        const mintResponse = await fclService.mint(
            `${ipfsEnpoint}/${metadataUploadResponse.Hash}`,
            'Certificate issued for course completion',
            org.orgName,
            user.flowAddress,
            0,
            `${ipfsEnpoint}/${uploadResponse.Hash}`,
            1
        );
        console.log('✔ Certificate minted');

        return await this.persistCertificateData(
            mintResponse,
            metadta,
            org,
            user,
            slot,
            data,
            certPath,
            null,
            `${ipfsEnpoint}/${metadataUploadResponse.Hash}`,
            preparer.user,
            verifier.user,
            issuer.user
        );
    }

    public async addPublicKey(
        orgId: number,
        userId: number,
        key: string,
        signAlg: number,
        hashAlg: number
    ): Promise<TransactionStatusObject> {
        const { flowAddress } = await UserRepository.findOrgUserById(
            userId,
            orgId
        );
        if (isEmpty(flowAddress)) {
            throw new InvalidRequestError(
                'Selected user does not contain a flow account associated with them.',
                'Invalid User id',
                [
                    [
                        'User must hav flow account associated with them to add public key'
                    ]
                ]
            );
        }

        const rs = await fclService.addPublicKey(
            flowAddress,
            key,
            signAlg,
            hashAlg
        );
        return rs;
    }

    public async removePublicKey(
        orgId: number,
        userId: number
    ): Promise<TransactionStatusObject> {
        const { flowAddress } = await UserRepository.findOrgUserById(
            userId,
            orgId
        );
        if (isEmpty(flowAddress)) {
            throw new InvalidRequestError(
                'Selected user does not contain a flow account associated with them.',
                'Invalid User id',
                [
                    [
                        'User must hav flow account associated with them to add public key'
                    ]
                ]
            );
        }

        const rs = await fclService.revokePublicKey(flowAddress, 0);
        return rs;
    }

    private async generateCertificateFile(
        org: Org,
        user: User,
        slot: Slot,
        data: CreateCertificateDTO,
        outDir: string
    ): Promise<string> {
        const templatePath = resolve('./templates/certificates/template1.pdf');
        if (existsSync(outDir) === false) {
            await mkdir(outDir, { recursive: true });
        }
        const fileName: string =
            `${org.id}_${user.id}_` + randomBytes(4).toString('hex') + '.pdf';
        const outPath = `${outDir}/${fileName}`;
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

    private async generateCertificateThumbnail(
        certificatePath: string,
        outDir: string
    ): Promise<string> {
        if (existsSync(outDir) === false) {
            await mkdir(outDir, { recursive: true });
        }
        const outPath = await this.pdfService.createCertificateThumbnail(
            certificatePath,
            outDir
        );
        return outPath;
    }

    private async generateCertificateMetadata(
        org: Org,
        user: User,
        slot: Slot,
        certPath: string,
        certData: CreateCertificateDTO,
        signers: User[]
    ): Promise<CertificateMetadata> {
        const date = new Date();
        const formatter = Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const issDate = formatter.format(date).split(' ').join('-');
        const metadata: CertificateMetadata = {
            Cert: {
                dimensions: null,
                mimeType: 'application/pdf',
                size: await getContentLength(certPath),
                templateID: 'template1',
                uri: certPath.toString()
            },
            CertData: {
                batchInfo: slot.slotTitle,
                certNumber: certData.certificateNumber,
                course: certData.courseName,
                gradeInfo: certData.grade
            },
            docType: 'Certificate',
            holder: user.flowAddress,
            holderName: user.name,
            Issuer: {
                Description: org.orgName,
                insitution: org.orgName,
                institutionID: org.id.toString(),
                issuedDate: issDate
            },
            PlatformInfo: {
                Platform: 'Certifi',
                MintedAt: 'www.certifi.ly'
            },
            Signer1: {
                address: signers[0].flowAddress,
                signerID: signers[0].id.toString()
            },
            Signer2: {
                address: signers[1].flowAddress,
                signerID: signers[1].id.toString()
            },
            Signer3: {
                address: signers[2].flowAddress,
                signerID: signers[2].id.toString()
            }
        };
        return metadata;
    }

    private async dispatchInvitation(user: OrgUser & { address: string }) {
        const invite = new OrgUserInviationMail(
            {
                orgName: user.organistaions[0].name,
                password: user.password,
                receipientAddress: user.email,
                recipientFirstName: user.name,
                address: user.address
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
                    new Error(
                        'Could not find user for id: ' + orgUser.id.toString()
                    )
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
            this.dispatchInvitation({
                ...orgUser,
                address
            }).then(
                () => {},
                () => {}
            );
            await fclService.transferFlowToken(0, 1, address);
            console.log('✓ Flow Token transferred');
            await this.fclService.setupAccount(0, address);
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
                            const error = {};

                            Object.getOwnPropertyNames(val).forEach(function (
                                propName
                            ) {
                                error[propName] = val[propName] as unknown;
                            });

                            return error;
                        }

                        return val as unknown;
                    },
                    4
                )
            );
        }
    }

    private async getIpfsAuthToken(): Promise<string> {
        const response = await post<IpfsAccessRequest, IpfsAccessToken>(
            'https://jason-eval-test.apigee.net/oauth/client_credential/accesstoken?grant_type=client_credentials',
            {
                client_id: process.env.IPFS_API_KEY,
                client_secret: process.env.IPFS_API_SECRET
            }
        );
        const error = new Error();
        if (response.statusCode !== 200) {
            error.message = 'Error response received.';
            console.error('Upload failed');
            throw error;
        }
        return response.body.access_token;
    }

    private async uploadToIpfs(
        accessToken: string,
        fileStream: Readable,
        fileName: string
    ): Promise<IpfsUploadResponse> {
        const form = new FormData();
        form.append('file', fileStream, { filename: fileName });
        const response = await postForm<IpfsUploadResponse>(
            accessToken,
            'https://ipfs.perma.store/access_token',
            form
        );
        const error = new Error();
        error.name = 'ResponseError';
        if (response.statusCode !== 200) {
            error.message = 'Error response received.';
            console.error('Upload failed');
            throw error;
        }
        const resBody: IpfsUploadResponse = response.body as IpfsUploadResponse;
        if (resBody.error) {
            error.message = resBody.Resp || 'Error response received.';
            console.error('Upload failed');
            throw error;
        } else if (isNotEmpty(resBody.resval)) {
            error.message = resBody.resval || 'Error response received.';
            console.error('Upload failed');
            throw error;
        }
        // console.log('Upload response', resBody);
        return resBody;
    }
    private async persistCertificateData(
        mintResponse: TransactionStatusObject,
        metadata: CertificateMetadata,
        org: Org,
        user: User,
        slot: Slot,
        certData: CreateCertificateDTO,
        certificatePath: string,
        certificateThumbnailPath: string,
        metadataHash: string,
        preparer: User,
        verifier: User,
        issuer: User
    ): Promise<Certificate> {
        try {
            const userEmail = await getDataSource()
                .getRepository(UserEmail)
                .findOneByOrFail({
                    userId: user.id,
                    isPrimary: 1
                });

            const course = await CourseRepoistory.findOrCreate(
                org.id,
                certData.courseName
            );
            const mintEventData: TransactionEvent<MintEventData> =
                mintResponse.events.find((event) =>
                    event.type.includes('Certifily.Mint')
                ) as TransactionEvent<MintEventData>;
            if (isEmpty(mintEventData)) {
                const err = new Error();
                err.name = 'MintPersistError';
                err.message = 'Failed to find mint event data in mint response';
            }
            const certificate = await getDataSource()
                .getRepository(Certificate)
                .save(
                    getDataSource()
                        .getRepository(Certificate)
                        .create({
                            certificateFilePath: certificatePath,
                            certificateHash: metadata.Cert.uri,
                            certificateNumber: certData.certificateNumber,
                            thumbnailFileName: certificateThumbnailPath
                                ? basename(certificateThumbnailPath)
                                : null,
                            thumbnailPath: certificateThumbnailPath
                                ? certificateThumbnailPath
                                : null,
                            courseId: course.id,
                            grade: certData.grade,
                            metadataHash,
                            metadataJson: metadata,
                            nftId: parseInt(mintEventData.data.id),
                            orgId: org.id,
                            signerIssuerId: issuer.id,
                            signerPreparerId: preparer.id,
                            signerVerifierId: verifier.id,
                            slotId: slot.id,
                            userEmailId: userEmail.id,
                            userId: user.id
                        })
                );

            return certificate;
        } catch (e) {
            const err = new Error();
            err.name = 'CertificatePersistError';
            err.message = 'Failed to Persist Certiticate data after mint';
            throw new UnhandledError(
                err,
                new ErrorDetail('CertificatePersistError', e)
            );
        }
    }
}

const userService = new UserService(fclService, pdfService);
export default userService;
