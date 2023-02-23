import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { resolve } from 'path';
import {
    CreateCertificateDTO,
    CreateUserDTO,
    UpdateUserDTO,
    UserIdUrlPramDTO
} from '../../dtos';
import { APIError, UnhandledError } from '../../errors';
import { ApiResponse, AuthUser } from '../../helpers';
import { UserService } from '../../services';

export class UserController {
    public constructor(private userService: UserService) {}

    public async getProfile(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const { id } = plainToInstance(AuthUser, request['user']);
            const res = await this.userService.getProfile(id);
            response
                .status(200)
                .send(new ApiResponse(200, res, 'Profile fetched'));
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async createOrgUser(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const orgId = request.header('cerfi-org-id');
            const reqBody = plainToInstance(CreateUserDTO, request.body);
            const res = await this.userService.createOrgUser(
                parseInt(orgId),
                reqBody
            );
            response
                .status(200)
                .send(new ApiResponse(200, res, 'User created'));
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async getOrgUser(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const orgId = request.header('cerfi-org-id');
            const { userId } = plainToInstance(
                UserIdUrlPramDTO,
                request.params
            );
            const res = await this.userService.getOrgUser(
                parseInt(orgId),
                parseInt(userId)
            );
            response.status(200).send(
                new ApiResponse(
                    200,
                    {
                        orgUser: res
                    },
                    'User fetched'
                )
            );
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async updateOrgUser(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const orgId = request.header('cerfi-org-id');
            const { userId } = plainToInstance(
                UserIdUrlPramDTO,
                request.params
            );
            const reqBody = plainToInstance(UpdateUserDTO, request.body);
            const res = await this.userService.updateOrgUser(
                parseInt(orgId),
                parseInt(userId),
                reqBody
            );
            response.status(200).send(
                new ApiResponse(
                    200,
                    {
                        orgUser: res
                    },
                    'User updated'
                )
            );
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async getOrgUsers(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const orgId = request.header('cerfi-org-id');
            const res = await this.userService.getOrgUsers(parseInt(orgId));
            response.status(200).send(
                new ApiResponse(
                    200,
                    {
                        count: res.count,
                        orgUsers: res.entity
                    },
                    'Users fetched'
                )
            );
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async createCertificate(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const orgId = request.header('cerfi-org-id');
            const { userId } = plainToInstance(
                UserIdUrlPramDTO,
                request.params
            );
            const reqBody = plainToInstance(CreateCertificateDTO, request.body);
            const res = await this.userService.createCertificate(
                parseInt(orgId),
                parseInt(userId),
                reqBody
            );
            // response.sendFile(
            //     resolve(res),
            //     {
            //         maxAge: 29030400,
            //         headers: {

            //             // Set this resource policy to "cross origin"
            //             // to allow embedding of image or video
            //             // in html pages
            //             "Cross-Origin-Resource-Policy": "cross-origin",
            //             "Content-Type":"application/pdf"
            //         }
            //     }
            // )
            response.download(resolve(res));
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }
}
