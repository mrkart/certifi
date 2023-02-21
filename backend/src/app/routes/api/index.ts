import { Router } from 'express';
import usersRouter from './users';

export const apiRouter = Router();
apiRouter.use('/api/users', usersRouter);
