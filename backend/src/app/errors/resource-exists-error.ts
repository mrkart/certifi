import { APIError } from './api-error';

export class ResourceExistsError extends APIError {
    public constructor(message = 'The resource already exists') {
        super(409, message);
    }
}
