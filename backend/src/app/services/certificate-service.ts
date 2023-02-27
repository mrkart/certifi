import { isEmpty } from 'class-validator';
import getDataSource from '../config/datasource';
import { ResourceNotFoundError } from '../errors';
import { CertificateDataResponse } from '../helpers';
import { Certificate } from '../models/entities/Certificate';

export class CertificateService {
    public async getRecentCertificate(
        orgId: number
    ): Promise<CertificateDataResponse[]> {
        const certificates = await getDataSource()
            .getRepository(Certificate)
            .find({
                where: {
                    orgId
                },
                relations: {
                    course: true,
                    org: true,
                    signerIssuer: true,
                    signerPreparer: true,
                    signerVerifier: true,
                    user: true,
                    userEmail: true,
                    slot: true
                },
                order: {
                    datetimeCreated: 'DESC'
                },
                take: 5
            });
        return certificates.map((cert) => {
            return {
                certificateHash: cert.certificateHash,
                certificateNumber: cert.certificateNumber,
                course: {
                    id: cert.course.id,
                    name: cert.course.name
                },
                datetimeCreated: cert.datetimeCreated,
                grade: cert.grade,
                id: cert.id,
                issuer: {
                    id: cert.signerIssuer.id,
                    name: cert.signerIssuer.name
                },
                metadataHash: cert.metadataHash,
                nftId: cert.nftId,
                org: {
                    id: cert.org.id,
                    name: cert.org.orgName
                },
                preparer: {
                    id: cert.signerPreparer.id,
                    name: cert.signerPreparer.name
                },
                slot: {
                    id: cert.slot.id,
                    name: cert.slot.slotTitle
                },
                thumbnailPath: cert.thumbnailFileName
                    ? '/api/v1/certificates/preview/' + cert.thumbnailFileName
                    : null,
                user: {
                    id: cert.user.id,
                    name: cert.user.name,
                    flowAddress: cert.user.flowAddress
                },
                verifier: {
                    id: cert.signerVerifier.id,
                    name: cert.signerVerifier.name
                }
            } as CertificateDataResponse;
        });
    }

    public async getCertificate(
        certificateNumber: string
    ): Promise<CertificateDataResponse> {
        const certificate = await getDataSource()
            .getRepository(Certificate)
            .findOne({
                where: {
                    certificateNumber
                },
                relations: {
                    course: true,
                    org: true,
                    signerIssuer: true,
                    signerPreparer: true,
                    signerVerifier: true,
                    user: true,
                    userEmail: true,
                    slot: true
                }
            });
        if (isEmpty(certificate)) {
            throw new ResourceNotFoundError('Certificate not found');
        }
        const res: CertificateDataResponse = {
            certificateHash: certificate.certificateHash,
            certificateNumber: certificate.certificateNumber,
            course: {
                id: certificate.course.id,
                name: certificate.course.name
            },
            datetimeCreated: certificate.datetimeCreated,
            grade: certificate.grade,
            id: certificate.id,
            issuer: {
                id: certificate.signerIssuer.id,
                name: certificate.signerIssuer.name
            },
            metadataHash: certificate.metadataHash,
            nftId: certificate.nftId,
            org: {
                id: certificate.org.id,
                name: certificate.org.orgName
            },
            preparer: {
                id: certificate.signerPreparer.id,
                name: certificate.signerPreparer.name
            },
            slot: {
                id: certificate.slot.id,
                name: certificate.slot.slotTitle
            },
            thumbnailPath: certificate.thumbnailFileName
                ? '/api/v1/certificates/preview/' +
                  certificate.thumbnailFileName
                : null,
            user: {
                id: certificate.user.id,
                name: certificate.user.name,
                flowAddress: certificate.user.flowAddress
            },
            verifier: {
                id: certificate.signerVerifier.id,
                name: certificate.signerVerifier.name
            }
        };
        return res;
    }

    public async getCertificateThumbnail(fileName: string) {
        const certificate = await getDataSource()
            .getRepository(Certificate)
            .findOne({
                where: {
                    thumbnailFileName: fileName
                }
            });
        if (isEmpty(certificate)) {
            throw new ResourceNotFoundError('Certificate not found');
        }
        return certificate.thumbnailPath;
    }
}

const certificateService = new CertificateService();
export default certificateService;
