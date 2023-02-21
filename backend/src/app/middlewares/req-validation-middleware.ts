import {
    ClassConstructor,
    instanceToPlain,
    plainToInstance
} from 'class-transformer';
import {
    isEmpty,
    isNotEmpty,
    isNumberString,
    validate,
    ValidationError
} from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { trimSanitizer } from '../sanitizers/trim-sanitizer';
import {
    AccessDeniedError,
    InvalidRequestBodyError,
    InvalidRequestError,
    UnhandledError
} from '../errors';
import { AuthUser } from '../helpers';

export function BodyValidationMiddleware(
    classType: ClassConstructor<unknown>,
    skipMissingProperties = false
) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const reqBody = plainToInstance(classType, { ...request.body });

        // Sanitize the request body by trimming the strings
        trimSanitizer.sanitize(reqBody as Record<string, unknown>);

        // Re assign the sanitized body back to
        // the request object.
        request.body = instanceToPlain(reqBody);

        try {
            // Validate the sanitize request body
            const validationErrors = await validateRequest(
                classType,
                { ...request.body },
                skipMissingProperties
            );
            if (validationErrors.length) {
                next(new InvalidRequestBodyError(validationErrors));
            } else {
                next();
            }
        } catch (e) {
            next(new UnhandledError(e));
        }
    };
}

export function QueryValidationMiddleware(
    classType: ClassConstructor<unknown>,
    skipMissingProperties = false
) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validationErrors = await validateRequest(
                classType,
                { ...request.query },
                skipMissingProperties
            );
            if (validationErrors.length) {
                next(
                    new InvalidRequestError(
                        'Required query parameters in request are either missing or invalid',
                        'INVALID_REQUEST_QUERY_PARAMETERS',
                        validationErrors
                    )
                );
            } else {
                next();
            }
        } catch (e) {
            next(new UnhandledError(e));
        }
    };
}

export function UrlParamsValidationMiddleware(
    classType: ClassConstructor<unknown>,
    skipMissingProperties = false
) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const validationErrors = await validateRequest(
            classType,
            { ...request.params },
            skipMissingProperties
        );
        if (validationErrors.length) {
            next(
                new InvalidRequestError(
                    'Required URL parameters in request are either missing or invalid',
                    'INVALID_REQUEST_URL_PARAMETERS',
                    validationErrors
                )
            );
        } else {
            next();
        }
    };
}

export async function OrgIdHeaderValidationMiddleare(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const orgId: string = request.header('cerfi-org-id');
    const user = plainToInstance(AuthUser, request['user']);
    const isSameOrgAccess = user.organistaions.find(
        (org) => org.id.toString() === orgId
    );
    if (isNumberString(orgId) && isNotEmpty(isSameOrgAccess)) {
        next();
    } else if (isNumberString(orgId) && isEmpty(isSameOrgAccess)) {
        next(new AccessDeniedError());
    } else {
        next(
            new InvalidRequestError(
                'Required URL parameters in request are either missing or invalid',
                'INVALID_REQUEST_URL_PARAMETERS',
                [
                    ['header certifi-org-id should not be empty'],
                    ['header certifi-org-id should be a number string']
                ]
            )
        );
    }
}

async function validateRequest(
    classType: ClassConstructor<unknown>,
    plain: unknown,
    skipMissingProperties: boolean
) {
    const objToValidate: object = plainToInstance(classType, plain) as object;
    const validationErrors = await validate(objToValidate, {
        skipMissingProperties
    });
    const messages = validationErrors.map((error: ValidationError) => {
        if (error.constraints) {
            return Object.values(error.constraints);
        }
        return error;
    });
    return messages;
}
