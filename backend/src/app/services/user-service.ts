import { CreateUserDTO } from '../dtos';
import {
    ListResponse,
    OrgUser,
    OrgUserResponse,
    Profile,
    Utility
} from '../helpers';
import MailTransporterFactory from '../helpers/transporter';
import { OrgUserInviationMail } from '../mail/org-user-invitation-mail';
import { UserRepository } from '../models/repositories/user-repository';

export class UserService {
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
        return {
            email: user.email,
            id: user.id,
            name: user.name,
            organistaions: user.organistaions,
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
}

const userService = new UserService();
export default userService;
