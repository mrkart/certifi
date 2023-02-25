import { Router } from 'express';
import { CertificateController } from '../../../controllers';
import { AuthenticationMiddleware } from '../../../middlewares/authentication-middleware';
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
certificateRouter.get('')
.get(
    '/recent',
    AuthenticationMiddleware,
    async (request, response, next) => {
        await controller.getRecent(request, response, next);
    }
);

export default certificateRouter;
