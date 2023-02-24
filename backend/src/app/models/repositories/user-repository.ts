import { hash } from 'bcrypt';
import { use } from 'chai';
import { isEmail, isEmpty, isNotEmpty, isString } from 'class-validator';
import { Repository } from 'typeorm';
import getDataSource from '../../config/datasource';
import { CreateUserDTO, UpdateUserDTO } from '../../dtos';
import { ResourceExistsError } from '../../errors';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { ListResponse, OrgUser, Profile, Utility } from '../../helpers';
import { Org } from '../entities/Org';
import { AccessType, OrgRoles } from '../entities/OrgRoles';
import { Slot } from '../entities/Slot';
import { SlotHasUser } from '../entities/SlotHasUser';
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
    updateOrgUser: (
        orgId: number,
        userId: number,
        request: UpdateUserDTO
    ) => Promise<User>;
    findOrgUserById: (userId: number, orgId: number) => Promise<User>;
}

type This = Repository<User> & UserRepositoryInterface;
export const UserRepository = getDataSource()
    .getRepository(User)
    .extend({
        findProfile: async function (
            this: This,
            emailOrId: string | number
        ): Promise<Profile> {
            let userId: number = emailOrId as number;
            if (isString(emailOrId) && isEmail(emailOrId)) {
                const userEmail = await this.manager
                    .getRepository(UserEmail)
                    .findOneBy({
                        email: emailOrId
                    });
                if (isEmpty(userEmail)) {
                    throw new ResourceNotFoundError('User not found');
                }
                userId = userEmail.userId;
            }
            const user = await this.findOneBy({
                id: userId
            });
            if (isEmpty(user)) {
                throw new ResourceNotFoundError('User not found');
            }
            const orgRoles = await this.manager.getRepository(OrgRoles).findBy({
                userId: user.id
            });
            const orgs = await this.manager.getRepository(Org).findBy({
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
                }),
                flowAddress: user.flowAddress
            };
            return profile;
        },
        findByEmail: async function (this: This, email: string): Promise<User> {
            const userEmail = await this.manager
                .getRepository(UserEmail)
                .findOneBy({
                    email
                });
            if (isEmpty(userEmail)) {
                throw new ResourceNotFoundError('User not found');
            }
            const user = await this.findOneBy({
                id: userEmail.userId
            });
            if (isEmpty(user)) {
                throw new ResourceNotFoundError('User not found');
            }
            return user;
        },
        findUserInOrg: async function (
            this: This,
            email: string,
            orgId: number
        ): Promise<User | null> {
            const userEmail = await this.manager
                .getRepository(UserEmail)
                .findOneBy({
                    email
                });
            if (isEmpty(userEmail)) {
                return null;
            }
            const orgUser = await this.manager
                .getRepository(OrgRoles)
                .findOneBy({
                    userId: userEmail.userId,
                    orgId
                });
            if (isEmpty(orgUser)) {
                return null;
            }

            const user = await this.findOneBy({
                id: userEmail.userId
            });
            if (isEmpty(user)) {
                return null;
            }
            return user;
        },
        createOrgUser: async function (
            this: This,
            request: CreateUserDTO,
            orgId: number
        ): Promise<OrgUser> {
            const existingUser = await this.manager
                .getRepository(UserEmail)
                .findOneBy({
                    email: request.email
                });
            if (isNotEmpty(existingUser)) {
                throw new ResourceExistsError(
                    'Email has been taken by another user'
                );
            }

            const org = await this.manager
                .withRepository(OrgRepository)
                .findById(orgId);

            const userInOrg = await this.findUserInOrg(request.email, orgId);
            if (isNotEmpty(userInOrg)) {
                throw new ResourceExistsError(
                    'User already exists in organisation'
                );
            }
            const password = Utility.generateRandomPassword(12);

            const user = await this.save(
                this.create({
                    name: request.name,
                    password: await hash(password, 16),
                    phone: request.phone
                })
            );
            const userEmail = await this.createUserEmail(
                request.email,
                user.id
            );
            const orgRole = await this.manager.getRepository(OrgRoles).save(
                this.manager.getRepository(OrgRoles).create({
                    accessType: AccessType.USER,
                    orgId: org.id,
                    userId: user.id
                })
            );
            const slot = await this.manager
                .withRepository(SlotRepository)
                .findOrCreate(request.slotName, orgId);
            await this.manager
                .withRepository(SlotRepository)
                .addUserToSlot(slot.id, user.id);
            const orgUser: OrgUser = {
                email: userEmail.email,
                password,
                phone: user.phone,
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
            this: This,
            orgId: number
        ): Promise<ListResponse<User>> {
            const org = await this.manager
                .withRepository(OrgRepository)
                .findById(orgId);
            const [users, count] = await this.findAndCount({
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
                },
                order: {
                    id: 'DESC'
                }
            });
            return new ListResponse(count, users);
        },
        createUserEmail: async function (
            this: This,
            email: string,
            userId: number
        ): Promise<UserEmail> {
            return await this.manager.getRepository(UserEmail).save(
                this.manager.getRepository(UserEmail).create({
                    email,
                    userId,
                    verificationStatus: 1,
                    isPrimary: 1
                })
            );
        },
        updateOrgUser: async function (
            this: This,
            orgId: number,
            userId: number,
            request: UpdateUserDTO
        ): Promise<User> {
            const org = await this.manager
                .withRepository(OrgRepository)
                .findById(orgId);
            const user = await this.findOne({
                relations: { userEmails: true },
                where: { id: userId }
            });
            if (isEmpty(user)) {
                throw new ResourceNotFoundError('User not found');
            }
            const orgRole = await this.manager
                .getRepository(OrgRoles)
                .findOneBy({
                    orgId: org.id,
                    userId: user.id,
                    accessType: AccessType.USER
                });
            if (isEmpty(orgRole)) {
                throw new ResourceNotFoundError('User not found');
            }
            user.name = isNotEmpty(request.name) ? request.name : user.name;
            user.phone = isNotEmpty(request.phone) ? request.phone : user.phone;
            await this.save(user);
            return user;
        },
        findOrgUserById: async function (
            this: This,
            userId: number,
            orgId: number
        ): Promise<User> {
            const org = await this.manager
                .withRepository(OrgRepository)
                .findById(orgId);
            const user = await this.findOne({
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
                        accessType: AccessType.USER,
                        userId
                    }
                }
            });
            if (isEmpty(user)) {
                throw new ResourceNotFoundError('User not found');
            }
            return user;
        }
    } as UserRepositoryInterface & ThisType<Repository<User> & UserRepositoryInterface>);
