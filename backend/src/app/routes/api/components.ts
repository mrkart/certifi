/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       description: Describes the error
 *       type: object
 *       properties:
 *           statusCode:
 *               type: string
 *           data:
 *               type: object
 *           message:
 *               type: string
 *     AuthRequest:
 *       description: Request for authentication
 *       type: object
 *       properties:
 *           email:
 *               type: string
 *               format: email
 *           password:
 *               type: string
 *     Credentials:
 *       type: object
 *       properties:
 *           accessToken:
 *               type: string
 *           refreshToken:
 *               type: string
 *     ProfileRole:
 *       type: object
 *       properties:
 *           id:
 *               type: integer
 *           name:
 *               type: string
 *     ProfileOrg:
 *       type: object
 *       properties:
 *           id:
 *               type: integer
 *           name:
 *               type: string
 *     Profile:
 *       type: object
 *       properties:
 *           id:
 *               type: integer
 *           name:
 *               type: string
 *           roles:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfileRole'
 *           organistaions:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfileOrg'
 *     RefreshAcessRequest:
 *       type: object
 *       properties:
 *           refreshToken:
 *               type: string
 *   responses:
 *     NotFound:
 *       description: The specified resource does not exsist
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *     InvalidRequest:
 *       description: The request is invalid
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *     UnhandledError:
 *       description: An unhandled error has occured
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *     JwtVerficationFailed:
 *       description: Failed to verify JWt
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *     AuthenticationRequired:
 *       description: Authentication is required
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 */
