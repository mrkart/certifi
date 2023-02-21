import { NextFunction, Request, Response } from 'express';
import { APIError, UnhandledError } from '../errors';
import { AuthUser } from '../helpers';
import authService from '../services/auth-service';

export async function AuthenticationMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const jwt = getBearerToken(request.headers.authorization);
        const authUser: AuthUser = await authService.verifyAccessToken(jwt);
        request['user'] = authUser;
        next();
    } catch (e) {
        if (e instanceof APIError) {
            next(e);
        } else {
            next(new UnhandledError(e));
        }
    }
}

function getBearerToken(authHeader: string): string {
    if (!authHeader) {
        return undefined;
    }
    const token = authHeader.split(' ');
    if (token[0] != 'Bearer') {
        return undefined;
    }
    return token[1];
}
