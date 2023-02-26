import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { NftIdUrlParamDTO } from '../../dtos';
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
            const { nftId } = plainToInstance(NftIdUrlParamDTO, request.params);
            const certificate = await this.certificateService.getCertificate(
                parseInt(nftId)
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
}
