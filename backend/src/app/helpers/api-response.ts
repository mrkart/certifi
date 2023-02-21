export class ApiResponse {
    public statusCode: number;
    public data: unknown;
    public message?: string;

    public constructor(statusCode: number, data: unknown, message?: string) {
        this.statusCode = statusCode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.data = { ...(data as any) };
        this.message = message;
    }
}
