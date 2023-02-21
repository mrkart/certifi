/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express';
import { EntryController } from 'src/app/controllers/entry/entry-contoller';
import { ApiRouter } from './api-router';

export class EntryRouter implements ApiRouter {
  public basePath = '/';
  private router: Router;
  public constructor(private sampleController: EntryController) {
    this.router = Router();
    this.initRoutes();
  }

  public get Router(): Router {
    return this.router;
  }

  private initRoutes(): void {
    /**
     * @openapi
     * /:
     *   get:
     *     summary: The entry point of the application
     *     description: The entrypoint of the application
     *     responses:
     *       200:
     *         description: Application works
     */
    this.router.get('/', this.sampleController.getEntry);
  }
}
