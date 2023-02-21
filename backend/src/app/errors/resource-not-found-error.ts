import { APIError } from './api-error';

export class ResourceNotFoundError extends APIError {
    public constructor(
        message = 'The resource you are looking for does not exist'
    ) {
        super(404, message);
    }
}
