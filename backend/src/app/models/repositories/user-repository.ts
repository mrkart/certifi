import { isEmail, isEmpty, isString } from 'class-validator';
import { Repository } from 'typeorm';
import getDataSource from '../../config/datasource';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { Org } from '../entities/Org';
import { OrgRoles } from '../entities/OrgRoles';
import { User } from '../entities/User';
import { UserEmail } from '../entities/UserEmail';

export interface Role {
    id: number;
    name: string;
}

export interface Organisation {
    id: number;
    name: string;
}

export interface Profile {
    id: number;
    name: string;
    roles: Role[];
    organistaions: Organisation[];
}

export interface UserRepositoryInterface {
    findProfile: (emailOrId: string | number) => Promise<Profile>;
    findByEmail: (email: string) => Promise<User>;
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
        }
    } as UserRepositoryInterface & ThisType<Repository<User> & UserRepositoryInterface>);
