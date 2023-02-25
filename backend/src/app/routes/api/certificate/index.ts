import { Router } from 'express';
import { CertificateController } from '../../../controllers';
import { NftIdUrlParamDTO } from '../../../dtos';
import { AccessControlMiddleware } from '../../../middlewares/access-control-middleware';
import { AuthenticationMiddleware } from '../../../middlewares/authentication-middleware';
import {
    OrgIdHeaderValidationMiddleare,
    UrlParamsValidationMiddleware
} from '../../../middlewares/req-validation-middleware';
import { AccessType } from '../../../models/entities/OrgRoles';
import certificateService from '../../../services/certificate-service';

const controller = new CertificateController(certificateService);
const certificateRouter = Router();

/**
 * @openapi
 * /api/certificates/recent:
 *   get:
 *     summary: Get Recently minted certificates
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Certificate
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
 *         description: Recent certificates
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
 *                      example: Recent certificates fetched
 *                    data:
 *                      type: object
 *                      properties:
 *                        certificates:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/CertificateDataResponse'
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
certificateRouter.get(
    '/recent',
    AuthenticationMiddleware,
    AccessControlMiddleware([
        AccessType.ISSUER,
        AccessType.PREPARER,
        AccessType.VERIFIER
    ]),
    OrgIdHeaderValidationMiddleare,
    async (request, response, next) => {
        await controller.getRecent(request, response, next);
    }
);

/**
 * @openapi
 * /api/certificates/{nftId}:
 *   get:
 *     summary: Get certificate
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Certificate
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: nftId
 *         type: integer
 *         example: 1
 *         required: true
 *     responses:
 *       "200":
 *         description: Recent certificates
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
 *                      example: Recent certificates fetched
 *                    data:
 *                      type: object
 *                      properties:
 *                      $ref: '#/components/schemas/CertificateDataResponse'
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
certificateRouter.get(
    '/:nftId',
    UrlParamsValidationMiddleware(NftIdUrlParamDTO),
    async (request, response, next) => {
        await controller.getCertificate(request, response, next);
    }
);

export default certificateRouter;
