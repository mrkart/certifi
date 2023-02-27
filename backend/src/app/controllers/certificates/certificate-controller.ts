import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { resolve } from 'path';
import {
    CertificaeFileNameUrlParamDTO,
    CertificaeNumberUrlParamDTO
} from '../../dtos';
import { APIError, UnhandledError } from '../../errors';
import { ApiResponse } from '../../helpers/api-response';
import { CertificateService } from '../../services';

export class CertificateController {
    public constructor(private certificateService: CertificateService) {}

    public async getRecent(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const orgId = request.header('cerfi-org-id');
            const certificates =
                await this.certificateService.getRecentCertificate(
                    parseInt(orgId)
                );
            response.status(200).send(
                new ApiResponse(
                    200,
                    {
                        certificates
                    },
                    'Recent certificates fetched'
                )
            );
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async getCertificate(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { certificateNumber } = plainToInstance(
                CertificaeNumberUrlParamDTO,
                request.params
            );
            const certificate = await this.certificateService.getCertificate(
                certificateNumber
            );
            response.status(200).send(
                new ApiResponse(
                    200,
                    {
                        certificate
                    },
                    'Certificate fetched'
                )
            );
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }

    public async getCertificateThumbnail(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { fileName } = plainToInstance(
                CertificaeFileNameUrlParamDTO,
                request.params
            );
            const path = await this.certificateService.getCertificateThumbnail(
                fileName
            );
            response.sendFile(resolve(path), {
                maxAge: 29030400,
                headers: {
                    // Set this resource policy to "cross origin"
                    // to allow embedding of image or video
                    // in html pages
                    'Cross-Origin-Resource-Policy': 'cross-origin'
                }
            });
        } catch (e) {
            if (e instanceof APIError) {
                next(e);
            } else {
                next(new UnhandledError(e));
            }
        }
    }
}
