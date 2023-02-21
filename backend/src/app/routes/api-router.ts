import { Router } from 'express';

export interface ApiRouter {
  basePath: string;
  Router: Router;
}
