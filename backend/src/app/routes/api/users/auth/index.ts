import Router from 'express';
import { AuthController } from '../../../../controllers/auth/auth-controller';
import { RefreshUserAccessDTO, SignInDTO } from '../../../../dtos';
import { BodyValidationMiddleware } from '../../../../middlewares/req-validation-middleware';
import authService from '../../../../services/auth-service';

const authRouter = Router();
const authController = new AuthController(authService);

/**
 * @openapi
 * /api/users/auth/sign-in:
 *   post:
 *     summary: Native users login
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Describe the visitor to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       "200":
 *         description: User login success
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
 *                      example: Login success
 *                    data:
 *                      type: object
 *                      properties:
 *                      $ref: '#/components/schemas/Credentials'
 *       "400":
 *         $ref: '#/components/responses/InvalidRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/UnhandledError'
 */
authRouter.post(
    '/sign-in',
    BodyValidationMiddleware(SignInDTO),
    async (request, response, next) => {
        await authController.signIn(request, response, next);
    }
);

/**
 * @openapi
 * /api/users/auth/refresh:
 *   post:
 *     summary: Refresh Access to auth
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: The refresh token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshAcessRequest'
 *     responses:
 *       "200":
 *         description: User access refreshed
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
 *                      example: Access Refreshed
 *                    data:
 *                      type: object
 *                      properties:
 *                        accessToken:
 *                          type: string
 *       "400":
 *         $ref: '#/components/responses/InvalidRequest'
 *       "403":
 *         $ref: '#/components/responses/JwtVerficationFailed'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/UnhandledError'
 */
authRouter.post(
    '/refresh',
    BodyValidationMiddleware(RefreshUserAccessDTO),
    async (request, response, next) => {
        await authController.refreshAccess(request, response, next);
    }
);

export default authRouter;
