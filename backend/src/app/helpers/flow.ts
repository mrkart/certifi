export interface Authorizer {
    address: string;
    privateKey: string;
}

export interface TransactionEvent<T = unknown> {
    type: string;
    transactionId: string;
    transactionIndex: number;
    eventIndex: number;
    data: T;
}

export interface TransactionStatusObject {
    blockId: string;
    status: number;
    statusString: string;
    errorMessage: string;
    statusCode: any;
    events: TransactionEvent[];
}

export interface AccountCreatedEventData {
    address: string;
}
