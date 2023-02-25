import getDataSource from '../config/datasource';
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
                user: {
                    id: cert.user.id,
                    name: cert.user.name
                },
                verifier: {
                    id: cert.signerVerifier.id,
                    name: cert.signerVerifier.name
                }
            } as CertificateDataResponse;
        });
    }
}

const certificateService = new CertificateService();
export default certificateService;
