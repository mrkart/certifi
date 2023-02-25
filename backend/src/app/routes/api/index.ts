import { Router } from 'express';
import certificateRouter from './certificate';
import usersRouter from './users';

export const apiRouter = Router();
apiRouter.use('/api/users', usersRouter);
apiRouter.use('/api/certificates',certificateRouter);
