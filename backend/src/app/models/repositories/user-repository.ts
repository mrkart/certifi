import { hash } from 'bcrypt';
import { isEmail, isEmpty, isNotEmpty, isString } from 'class-validator';
import { Repository } from 'typeorm';
import getDataSource from '../../config/datasource';
import { CreateUserDTO } from '../../dtos';
import { ResourceExistsError } from '../../errors';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { ListResponse, OrgUser, Profile, Utility } from '../../helpers';
import { Org } from '../entities/Org';
import { AccessType, OrgRoles } from '../entities/OrgRoles';
import { Slot } from '../entities/Slot';
import { User } from '../entities/User';
import { UserEmail } from '../entities/UserEmail';
import OrgRepository from './org-repository';
import SlotRepository from './SlotRepository';

export interface UserRepositoryInterface {
    findProfile: (emailOrId: string | number) => Promise<Profile>;
    findByEmail: (email: string) => Promise<User>;
    findUserInOrg: (email: string, orgId: number) => Promise<User>;
    createOrgUser: (request: CreateUserDTO, orgId: number) => Promise<OrgUser>;
    findOrgUsers: (orgId: number) => Promise<ListResponse<User>>;
    createUserEmail: (email: string, userId: number) => Promise<UserEmail>;
    findOrCreateOrgRole: (orgId: number, userId: number) => Promise<OrgRoles>;
}

type This = Repository<User> & UserRepositoryInterface;
export const UserRepository = getDataSource()
    .getRepository(User)
    .extend({
        findProfile: async function (
            emailOrId: string | number
        ): Promise<Profile> {
            const self: This = this;
            let userId: number = emailOrId as number;
            if (isString(emailOrId) && isEmail(emailOrId)) {
                const userEmail = await self.manager
                    .getRepository(UserEmail)
                    .findOneBy({
                        email: emailOrId
                    });
                if (isEmpty(userEmail)) {
                    throw new ResourceNotFoundError('User not found');
                }
                userId = userEmail.userId;
            }
            const user = await self.findOneBy({
                id: userId
            });
            if (isEmpty(user)) {
                throw new ResourceNotFoundError('User not found');
            }
            const orgRoles = await self.manager.getRepository(OrgRoles).findBy({
                userId: user.id
            });
            const orgs = await self.manager.getRepository(Org).findBy({
                orgRoles: orgRoles
            });

            const profile: Profile = {
                id: user.id,
                name: user.name,
                organistaions: orgs.map((org) => {
                    return {
                        id: org.id,
                        name: org.orgName
                    };
                }),
                roles: orgRoles.map((orgRole) => {
                    return {
                        id: orgRole.id,
                        name: orgRole.accessType
                    };
                })
            };
            return profile;
        },
        findByEmail: async function (email: string): Promise<User> {
            const self: This = this;
            const userEmail = await self.manager
                .getRepository(UserEmail)
                .findOneBy({
                    email
                });
            if (isEmpty(userEmail)) {
                throw new ResourceNotFoundError('User not found');
            }
            const user = await self.findOneBy({
                id: userEmail.userId
            });
            if (isEmpty(user)) {
                throw new ResourceNotFoundError('User not found');
            }
            return user;
        },
        findUserInOrg: async function (
            email: string,
            orgId: number
        ): Promise<User | null> {
            const self: This = this;

            const userEmail = await self.manager
                .getRepository(UserEmail)
                .findOneBy({
                    email
                });
            if (isEmpty(userEmail)) {
                return null;
            }
            const orgUser = await self.manager
                .getRepository(OrgRoles)
                .findOneBy({
                    userId: userEmail.userId,
                    orgId
                });
            if (isEmpty(orgUser)) {
                return null;
            }

            const user = await self.findOneBy({
                id: userEmail.userId
            });
            if (isEmpty(user)) {
                return null;
            }
            return user;
        },
        createOrgUser: async function (
            request: CreateUserDTO,
            orgId: number
        ): Promise<OrgUser> {
            const self: This = this;

            const existingUser = await self.manager
                .getRepository(UserEmail)
                .findOneBy({
                    email: request.email
                });
            if (isNotEmpty(existingUser)) {
                throw new ResourceExistsError(
                    'Email has been taken by another user'
                );
            }

            const org = await self.manager
                .withRepository(OrgRepository)
                .findById(orgId);

            const userInOrg = await self.findUserInOrg(request.email, orgId);
            if (isNotEmpty(userInOrg)) {
                throw new ResourceExistsError(
                    'User already exists in organisation'
                );
            }
            const password = Utility.generateRandomPassword(12);

            const user = await self.save(
                self.create({
                    name: request.name,
                    password: await hash(password, 16),
                    phone: request.phone
                })
            );
            const userEmail = await self.createUserEmail(
                request.email,
                user.id
            );
            const orgRole = await self.manager.getRepository(OrgRoles).save(
                self.manager.getRepository(OrgRoles).create({
                    accessType: AccessType.USER,
                    orgId: org.id,
                    userId: user.id
                })
            );
            const slot = await self.manager
                .withRepository(SlotRepository)
                .findOrCreate(request.slotName, orgId);
            await self.manager
                .withRepository(SlotRepository)
                .addUserToSlot(slot.id, user.id);
            const orgUser: OrgUser = {
                email: userEmail.email,
                password,
                id: user.id,
                name: user.name,
                organistaions: [
                    {
                        id: org.id,
                        name: org.orgName
                    }
                ],
                roles: [
                    {
                        id: orgRole.id,
                        name: orgRole.accessType
                    }
                ],
                slot: [
                    {
                        id: slot.id,
                        name: slot.slotTitle
                    }
                ]
            };
            return orgUser;
        },
        findOrgUsers: async function (
            orgId: number
        ): Promise<ListResponse<User>> {
            const self: This = this;
            const org = await self.manager
                .withRepository(OrgRepository)
                .findById(orgId);
            const [users, count] = await self.findAndCount({
                relations: {
                    orgRoles: {
                        org: true
                    },
                    slotHasUsers: {
                        slot: true
                    },
                    userEmails: true
                },
                where: {
                    orgRoles: {
                        orgId: org.id,
                        accessType: AccessType.USER
                    }
                }
            });
            return new ListResponse(count, users);
        },
        createUserEmail: async function (
            email: string,
            userId: number
        ): Promise<UserEmail> {
            const self: This = this;
            return await self.manager.getRepository(UserEmail).save(
                self.manager.getRepository(UserEmail).create({
                    email,
                    userId,
                    verificationStatus: 1,
                    isPrimary: 1
                })
            );
        }
    } as UserRepositoryInterface & ThisType<Repository<User> & UserRepositoryInterface>);
