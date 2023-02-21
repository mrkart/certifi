import { APIError } from './api-error';

export class AccessDeniedError extends APIError {
    public constructor(message = 'Access Denied') {
        super(403, message);
    }
}
