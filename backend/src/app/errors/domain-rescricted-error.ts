import { APIError, ErrorDetail } from './api-error';

export class DomainRestrictedError extends APIError {
    public constructor(domain: string) {
        super(
            403,
            'Domain Blocked by CORS policy',
            new ErrorDetail('DOMAIN_BLOCKED', {
                domain
            })
        );
    }
}
