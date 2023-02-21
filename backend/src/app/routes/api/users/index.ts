import Router from 'express';
import { UserController } from '../../../controllers';
import { CreateUserDTO, UserIdUrlPramDTO } from '../../../dtos';
import { AuthenticationMiddleware } from '../../../middlewares/authentication-middleware';
import {
    BodyValidationMiddleware,
    OrgIdHeaderValidationMiddleare,
    UrlParamsValidationMiddleware
} from '../../../middlewares/req-validation-middleware';
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

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create org user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: cerfi-org-id
 *         type: integer
 *         example: 1
 *         required: true
 *     requestBody:
 *       description: Describe the user to be added to organisation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       "200":
 *         description: User created
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
 *                      example: Org user created
 *                    data:
 *                      type: object
 *                      properties:
 *                      $ref: '#/components/schemas/OrgUser'
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
usersRouter.post(
    '/',
    AuthenticationMiddleware,
    OrgIdHeaderValidationMiddleare,
    BodyValidationMiddleware(CreateUserDTO),
    async (request, response, next) => {
        await userController.createOrgUser(request, response, next);
    }
);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get the list of org users
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: cerfi-org-id
 *         type: integer
 *         example: 1
 *         required: true
 *     responses:
 *       "200":
 *         description: User created
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
 *                      example: Org user created
 *                    data:
 *                      type: object
 *                      properties:
 *                        count:
 *                          type: integer
 *                          description: The number of org users in list
 *                        orgUsers:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/OrgUser'
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
    '/',
    AuthenticationMiddleware,
    OrgIdHeaderValidationMiddleare,
    async (request, response, next) => {
        await userController.getOrgUsers(request, response, next);
    }
);

console.log(JSON.stringify(usersRouter._router.stack, null, 4));

export default usersRouter;
