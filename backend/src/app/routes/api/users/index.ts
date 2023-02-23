import Router from 'express';
import { UserController } from '../../../controllers';
import { CreateUserDTO, UpdateUserDTO, UserIdUrlPramDTO } from '../../../dtos';
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
 *         description: Users fetched
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

/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     summary: Get the user details
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
 *       - in: path
 *         name: userId
 *         type: integer
 *         example: 1
 *         required: true
 *     responses:
 *       "200":
 *         description: User fetched
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
usersRouter.get(
    '/:userId',
    AuthenticationMiddleware,
    OrgIdHeaderValidationMiddleare,
    async (request, response, next) => {
        await userController.getOrgUser(request, response, next);
    }
);

/**
 * @openapi
 * /api/users/{userId}:
 *   put:
 *     summary: Update user details
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
 *       - in: path
 *         name: userId
 *         type: integer
 *         example: 1
 *         required: true
 *     requestBody:
 *       description: Describe the user to be added to organisation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
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
usersRouter.put(
    '/:userId',
    AuthenticationMiddleware,
    OrgIdHeaderValidationMiddleare,
    BodyValidationMiddleware(UpdateUserDTO),
    async (request, response, next) => {
        await userController.updateOrgUser(request, response, next);
    }
);

/**
 * @openapi
 * /api/users/{userId}/certificate:
 *   post:
 *     summary: generate certificate
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
 *       - in: path
 *         name: userId
 *         type: integer
 *         example: 1
 *         required: true
 *     responses:
 *       "200":
 *         description: Certificate generated
 *         content:
 *          application/pdf:
 *            schema:
 *              type: string
 *              format: binary
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
    '/:userId/certificate',
    AuthenticationMiddleware,
    OrgIdHeaderValidationMiddleare,
    async (request, response, next) => {
        await userController.createCertificate(request, response, next);
    }
);

export default usersRouter;
