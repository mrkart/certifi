import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UserIdUrlPramDTO } from '../../dtos';
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
}
