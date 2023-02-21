import { ValidationError } from 'class-validator';
import { APIError, ErrorDetail } from './api-error';

export class InvalidRequestError extends APIError {
  public constructor(message: string, errorCode: string, details: unknown) {
    super(400, message, new ErrorDetail(errorCode, details));
  }
}

export class InvalidRequestBodyError extends APIError {
  public constructor(validationErrors: (ValidationError | string[])[]) {
    super(
      400,
      'Required parameters in request body are either missing or invalid',
      new ErrorDetail('INVALID_REQUEST_BODY', validationErrors)
    );
  }
}
