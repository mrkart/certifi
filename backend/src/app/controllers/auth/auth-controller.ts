import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { RefreshUserAccessDTO, SignInDTO } from '../../dtos';
import { APIError, UnhandledError } from '../../errors';
import { ApiResponse } from '../../helpers';
import { AuthService } from '../../services';

export class AuthController {
    public constructor(private authService: AuthService) {}

    public async signIn(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = plainToInstance(
                SignInDTO,
                request.body
            );
            const res = await this.authService.siginIn(email, password);
            response
                .status(200)
                .send(new ApiResponse(200, res, 'Authentication success'));
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async refreshAccess(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const { refreshToken } = plainToInstance(
                RefreshUserAccessDTO,
                request.body
            );
            const res = await this.authService.refreshAccess(refreshToken);
            response.status(200).send(
                new ApiResponse(
                    200,
                    {
                        accessToken: res
                    },
                    'Access refreshed'
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
