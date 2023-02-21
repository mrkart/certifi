import { APIError, ErrorDetail } from './api-error';

export class TokenExpiredError extends APIError {
    constructor(error?: Error) {
        super(
            403,
            'Token has expired',
            new ErrorDetail(
                'TOKEN_EXPIRED_ERROR',
                error ? error.message : 'JWT has expired'
            ),
            error
        );
    }
}

export class TokeninvalidError extends APIError {
    constructor(error?: Error) {
        super(
            401,
            'Token is invalid',
            new ErrorDetail(
                error ? error.name : 'JWT_IS_INVALID',
                error ? error.message : 'JWT provided is invalid'
            ),
            error
        );
    }
}
