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
 *     CreateUserDTO:
 *       type: object
 *       properties:
 *           email:
 *             type: string
 *             format: email
 *           name:
 *               type: string
 *           phone:
 *               type: string
 *           slotName:
 *               type: string
 *     OrgSlot:
 *       type: object
 *       properties:
 *           id:
 *               type: integer
 *           name:
 *               type: string
 *     OrgUser:
 *       allOf:
 *         - $ref: '#/components/schemas/Profile'
 *         - type: object
 *           properties:
 *               email:
 *                 type: string
 *                 format: email
 *               slots:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrgSlot'
 *     Course:
 *       type: object
 *       properties:
 *           id:
 *               type: integer
 *           name:
 *               type: string
 *     CertificateResponse:
 *       type: object
 *       properties:
 *           certificateHash:
 *               type: string
 *           certificateNumber:
 *               type: string
 *           course:
 *             type: object
 *             properties:
 *             $ref: '#/components/schemas/Course'
 *           datetimeCreated:
 *             type: string
 *             format: date-time
 *           email:
 *             type: string
 *             format: email
 *           grade:
 *             type: string
 *           id:
 *             type: integer
 *           nftId:
 *             type: integer
 *           org:
 *             type: object
 *             properties:
 *             $ref: '#/components/schemas/Course'
 *           slot:
 *             type: object
 *             properties:
 *             $ref: '#/components/schemas/ProfileOrg'
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *           name:
 *               type: string
 *           phone:
 *               type: string
 *     CreateCertificateDTO:
 *       type: object
 *       properties:
 *           courseName:
 *             type: string
 *           grade:
 *             type: string
 *           slotId:
 *             type: integer
 *           certificateNumber:
 *             type: string
 *     CertificateDataResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/CertificateResponse'
 *         - type: object
 *           properties:
 *             issuer:
 *               type: object
 *               $ref: '#/components/schemas/Course'
 *             verifier:
 *               type: object
 *               $ref: '#/components/schemas/Course'
 *             preparer:
 *               type: object
 *               $ref: '#/components/schemas/Course'
 *             user:
 *               type: object
 *               $ref: '#/components/schemas/Course'
 *     AddPublicKeyDTO:
 *       type: object
 *       properties:
 *           key:
 *             type: string
 *           hashAlg:
 *             type: integer
 *           signAlg:
 *             type: integer
 *     TransactionObject:
 *       type: object
 *       properties:
 *           blockId:
 *             type: string
 *           status:
 *             type: integer
 *           statusString:
 *             type: string
 *           errorMessage:
 *             type: string
 *           statusCode:
 *             type: object
 *             $ref: {}
 *           events:
 *             type: array
 *             items: {}
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
 *       description: Unauthorized Access (or) Failed to verify JWt
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
