import { Request, Response } from 'express';
import { ApiResponse } from '../../helpers/api-response';

export class EntryController {
  public constructor() {}

  public getEntry(request: Request, response: Response): void {
    response.status(200).send(
      new ApiResponse(
        200,
        {
          documentation: `${request.protocol}://${request.get('host')}/api-docs`
        },
        'Api server is live'
      )
    );
  }
}
