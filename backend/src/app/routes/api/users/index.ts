import Router from 'express';
import { UserController } from '../../../controllers';
import { UserIdUrlPramDTO } from '../../../dtos';
import { AuthenticationMiddleware } from '../../../middlewares/authentication-middleware';
import { UrlParamsValidationMiddleware } from '../../../middlewares/req-validation-middleware';
import userService from '../../../services/user-service';
import authRouter from './auth';

const usersRouter = Router();

const userController = new UserController(userService);

usersRouter.use('/auth', authRouter);


/**
 * @openapi
 * /api/users/profile/self:
 *   get:
 *     summary: Get auth user profile
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: User Profile
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    statusCode:
 *                      type: integer
 *                    message:
 *                      type: string
 *                      description: Success message
 *                      example: Profile fetched
 *                    data:
 *                      type: object
 *                      properties:
 *                      $ref: '#/components/schemas/Profile'
 *       "400":
 *         $ref: '#/components/responses/InvalidRequest'
 *       "401":
 *         $ref: '#/components/responses/AuthenticationRequired'
 *       "403":
 *         $ref: '#/components/responses/JwtVerficationFailed'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/UnhandledError'
 */
usersRouter.get(
    '/profile/self',
    AuthenticationMiddleware,
    async (request, response, next) => {
        await userController.getProfile(request, response, next);
    }
);

export default usersRouter;
