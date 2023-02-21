import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { UserIdUrlPramDTO } from '../../dtos';
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
}
