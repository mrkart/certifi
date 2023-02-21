import { Router } from 'express';
import { ApiRouter } from '../../api-router';
const routes: ApiRouter[] = [];

const v1Router = Router();

routes.forEach((route) => {
  v1Router.use(`/v1/${route.basePath}`, route.Router);
});
export default v1Router;
