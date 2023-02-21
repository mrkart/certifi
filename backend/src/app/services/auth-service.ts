import { compare } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { createHash } from 'crypto';
import { sign, verify, VerifyOptions } from 'jsonwebtoken';
import getDataSource from '../config/datasource';
import { APIError, ErrorDetail, UnhandledError } from '../errors';
import { TokenExpiredError, TokeninvalidError } from '../errors/auth-errors';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import {
    AuthUser,
    AuthUserFactory,
    UserCredentials,
    UserRefreshPayload
} from '../helpers';
import { User } from '../models/entities/User';
import { UserRepository } from '../models/repositories/user-repository';

export class AuthService {
    public async siginIn(
        email: string,
        password: string
    ): Promise<UserCredentials> {
        const user = await UserRepository.findByEmail(email);
        const pwdVerificationStatus = await compare(password, user.password);
        if (pwdVerificationStatus === false) {
            throw new APIError(400, 'Incorrect email or password');
        }
        const profile = await UserRepository.findProfile(email);

        const authUser = AuthUserFactory.createAuthUser(profile);

        const accessToken = this.createAccessToken(authUser);
        const hash = createHash('sha256')
            .update(JSON.stringify(authUser, null, 4))
            .digest('base64url');

        const refreshToken = this.createRefreshToken(authUser, hash);

        return new UserCredentials(accessToken, refreshToken);
    }

    public async refreshAccess(refreshToken: string): Promise<string> {
        const refreshUser = this.deCodeJwt(
            refreshToken,
            process.env.USER_AUTH_REFRESH_SECRET,
            {
                issuer: process.env.USER_AUTH_ISSUER,
                audience: process.env.USER_AUTH_AUDIENCE
            }
        ) as UserRefreshPayload;

        const profile = await UserRepository.findProfile(refreshUser.userId);

        const authUser = AuthUserFactory.createAuthUser(profile);

        const accessToken = this.createAccessToken(authUser);

        return accessToken;
    }

    public createAccessToken(user: AuthUser) {
        const accessToken = sign(
            instanceToPlain(user),
            process.env.USER_AUTH_SECRET,
            {
                issuer: process.env.USER_AUTH_ISSUER,
                audience: process.env.USER_AUTH_AUDIENCE,
                expiresIn: parseInt(process.env.USER_AUTH_VALIDITY)
            }
        );
        return accessToken;
    }

    public createRefreshToken(user: AuthUser, refreshTokenId: string) {
        const authRefreshPayload = new UserRefreshPayload();
        authRefreshPayload.userId = user.id;
        authRefreshPayload.refreshTokenId = refreshTokenId;
        const refreshToken = sign(
            instanceToPlain(authRefreshPayload),
            process.env.USER_AUTH_REFRESH_SECRET,
            {
                issuer: process.env.USER_AUTH_ISSUER,
                audience: process.env.USER_AUTH_AUDIENCE,
                expiresIn: parseInt(process.env.USER_AUTH_REFRESH_VALIDITY)
            }
        );
        return refreshToken;
    }

    public deCodeJwt(jwt: string, secret: string, options: VerifyOptions) {
        try {
            const decodedToken = verify(jwt, secret, options);
            return decodedToken;
        } catch (e) {
            if (e.name && e.message) {
                switch (e.name) {
                    case 'JsonWebTokenError':
                        if (
                            !e.message
                                .toLowerCase()
                                .includes('jwt must be provided')
                        ) {
                            throw new APIError(
                                403,
                                'Failed to verify token',
                                new ErrorDetail(
                                    'JSON_WEB_TOKEN_ERROR',
                                    e.message
                                ),
                                e
                            );
                        } else {
                            throw new APIError(
                                401,
                                'Authentication required',
                                new ErrorDetail(
                                    'JSON_WEB_TOKEN_ERROR',
                                    e.message
                                ),
                                e
                            );
                        }
                    case 'TokenExpiredError':
                        throw new TokenExpiredError(e);
                    default:
                        throw new TokeninvalidError(e);
                }
            } else {
                throw new UnhandledError(e);
            }
        }
    }
    public async verifyAccessToken(accessToken: string) {
        const authUser: AuthUser = this.deCodeJwt(
            accessToken,
            process.env.USER_AUTH_SECRET,
            {
                issuer: process.env.USER_AUTH_ISSUER,
                audience: process.env.USER_AUTH_AUDIENCE
            }
        ) as AuthUser;
        const user = await getDataSource()
            .getRepository(User)
            .findOne({
                where: {
                    id: authUser.id
                }
            });

        if (!user) {
            throw new ResourceNotFoundError('User not found');
        }

        // // Check if email has been verified
        // if (!(await this.userService.isUserEmailVerified(user.id))) {
        //     throw new UserEmailNotVerifiedException();
        // }

        // // Check if user account is disabled
        // if (await this.userService.isUserDisabled(user.id)) {
        //     throw new UserDisabledException();
        // }
        return authUser;
    }
}

const authService = new AuthService();
export default authService;
