import { plainToInstance } from 'class-transformer';
import { isEmpty } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { APIError, ErrorDetail, UnhandledError } from '../errors';
import { AuthUser } from '../helpers';
import { AccessType } from '../models/entities/OrgRoles';

export function AccessControlMiddleware(accessTypes: AccessType[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            if (isEmpty(request['user'])) {
                const err = new Error(
                    'Could not check role becuase auth user is not avabilable'
                );
                err.name = 'AccessControlError';
                throw err;
            }
            const authUser = plainToInstance(AuthUser, request['user']);
            if (
                authUser.roles.length == 0 ||
                isEmpty(
                    authUser.roles.find(
                        (role) =>
                            accessTypes.indexOf(role.name as AccessType) !== -1
                    )
                )
            ) {
                throw new APIError(
                    403,
                    'Access Denined',
                    new ErrorDetail(
                        'UNAUTHORIZED_ACCESS',
                        'User does not have the specific role to access this resource'
                    )
                );
            }
            next();
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    };
}
