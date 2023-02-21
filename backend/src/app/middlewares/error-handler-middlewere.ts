import { Request, Response, NextFunction } from 'express';
import { APIError, ErrorDetail, UnhandledError } from '../errors';
import { ApiResponse } from '../helpers';

export function unhandledErrorHandler(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    console.error(error);
    let err: APIError;
    if (error instanceof APIError) {
        err = error;
    } else if (
        'status' in error &&
        'body' in error &&
        'statusCode' in error &&
        'type' in error &&
        (error as Record<string, unknown>).status === 400
    ) {
        const jsonError = error as Record<string, unknown>;
        err = new APIError(
            400,
            'Invalid JSON format',
            new ErrorDetail(jsonError.type as string, jsonError.body)
        );
    } else {
        err = new UnhandledError(error);
    }

    response
        .status(err.httpCode)
        .send(new ApiResponse(err.httpCode, err.details, err.message));
}

export function routeErrorHandler(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    if (!request.route) {
        response.status(404).send(
            new ApiResponse(
                404,
                {
                    method: request.method,
                    path: request.path
                },
                `Cannot ${request.method} ${request.path}`
            )
        );
    } else {
        next();
    }
}
