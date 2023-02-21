/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from 'express';
import { APIError, ErrorDetail, UnhandledError } from '../errors';
import { Logger } from '../helpers';

export function apiErrorHandler(
  error: any,
  request: Request,
  response: Response
): void {
  let err: APIError;
  if (error instanceof APIError) {
    err = error;
  } else if (
    'status' in error &&
    'body' in error &&
    'statusCode' in error &&
    'type' in error &&
    error['status'] === 400
  ) {
    err = new APIError(
      400,
      'Invalid JSON format',
      new ErrorDetail(error['type'] as string, error['body'])
    );
  } else {
    err = new UnhandledError(error);
  }

  // Log errors other than 4xx errors
  if (err.httpCode >= 500 || err.httpCode < 400) {
    Logger.error(
      /*JSON.parse(
                JSON.stringify(error)
            )*/
      error
    );
    if (err.httpCode === 503) {
      // Tell the client to retry after 1 minute
      response.setHeader('Retry-After', 60);
    }
  }
  response.status(err.httpCode).send({
    statusCode: err.httpCode,
    message: err.message,
    data: err.details
  });
}
