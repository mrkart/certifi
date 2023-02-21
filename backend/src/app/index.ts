import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AddressInfo } from 'net';
import { Server } from 'http';
import { routes } from './routes';
import {
  routeErrorHandler,
  unhandledErrorHandler,
  apiErrorHandler
} from './middlewares';
import { isEmpty } from 'class-validator';
import { DomainRestrictedError } from './errors';
import swaggerJsdoc from 'swagger-jsdoc';
import { apiDefintion } from './config/api-doc-config';
import { join } from 'path';
import { ConsoleColor, Logger } from './helpers';
import { apiRouter } from './routes/api';
export class App {
  private app: express.Express;
  public constructor() {
    this.app = express();
    this.init();
    this.initRoutes();
    this.initErrorMiddlewares();
  }

  public listen(url: string, port: number): Server {
    const server = this.app.listen(port, url, () => {
      const address = (server.address() as AddressInfo).address;
      const port = (server.address() as AddressInfo).port;
      Logger.log(
        'Application running on url' +
          Logger.setColor(`📡: http://${address}:${port}/`, ConsoleColor.GREEN)
      );
      Logger.log(
        'Api documentation running on url' +
          Logger.setColor(
            `📙: http://${address}:${port}/api-docs`,
            ConsoleColor.GREEN
          )
      );
    });
    return server;
  }

  private init() {
    this.checkEnvirionment();
    this.app.use(helmet());
    this.app.use(
      cors((request, callback) => {
        const whiteList = process.env.DOMAIN_WHITE_LIST.split(',');
        const origin = request.headers.origin;
        if (whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, {
            origin: true
          });
        } else {
          callback(new DomainRestrictedError(origin));
        }
      })
    );
    this.app.use(bodyParser.json({ limit: '50mb' }));

    const apiDocsPath = join(__dirname, '../api-docs');
    this.app.use('/api-docs', express.static(apiDocsPath));
    this.app.use('/swagger.json', (request, response) => {
      response.setHeader('Content-Type', 'application/json');
      const swaggerSpec = swaggerJsdoc({
        swaggerDefinition: apiDefintion,
        apis: ['**/*.ts']
      });
      response.send(swaggerSpec);
    });
  }

  private initRoutes() {
    routes.forEach((route) => {
      this.app.use(route.Router);
    });
    this.app.use(apiRouter);
    this.app.use(routeErrorHandler);
  }

  private initErrorMiddlewares() {
    this.app.use(apiErrorHandler);
    this.app.use(unhandledErrorHandler);
  }

  private checkEnvirionment() {
    if (
      isEmpty(process.env.APP_PORT) ||
      isEmpty(process.env.APP_DOMAIN) ||
      isEmpty(process.env.DOMAIN_WHITE_LIST)
    ) {
      throw new Error('Missing environmetvariables for app config');
    }
    if (
      isEmpty(process.env.MYSQL_PORT) ||
      isEmpty(process.env.MYSQL_HOST) ||
      isEmpty(process.env.MYSQL_USERNAME) ||
      isEmpty(process.env.MYSQL_PASSWORD) ||
      isEmpty(process.env.MYSQL_DATABASE)
    ) {
      throw new Error('Missing environmetvariables for DB config');
    }
  }
}
