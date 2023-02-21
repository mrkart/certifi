export class ErrorDetail {
    public errorCode: string;
    public data: unknown;
    public constructor(errorCode: string, data: unknown) {
        (this.errorCode = errorCode), (this.data = data);
    }
}

export class APIError extends Error {
    public constructor(
        public httpCode: number,
        public message: string,
        public details?: ErrorDetail,
        public innerError?: unknown
    ) {
        super(message);
    }
}

export class UnhandledError extends APIError {
    public constructor(error: unknown, details?: ErrorDetail) {
        super(
            500,
            'Unhandled error has occured',
            details ? details : null,
            error
        );
    }
}

export class FileNotFoundError extends APIError {
    public constructor() {
        super(404, 'File not found');
    }
}
