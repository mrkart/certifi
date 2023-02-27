import { Certificate } from '../models/entities/Certificate';
import { Course } from '../models/entities/Course';
import { User } from '../models/entities/User';

export type CertificateDataResponse = Pick<
    Certificate,
    | 'id'
    | 'nftId'
    | 'certificateHash'
    | 'metadataHash'
    | 'datetimeCreated'
    | 'certificateNumber'
    | 'grade'
> & {
    user: Pick<User, 'id' | 'name'>;
} & { preparer: Pick<User, 'id' | 'name'> } & {
    verifier: Pick<User, 'id' | 'name'>;
} & { issuer: Pick<User, 'id' | 'name'> } & {
    slot: { id: number; name: string };
} & { course: Pick<Course, 'id' | 'name'> } & {
    org: { id: number; name: string };
} & { thumbnailPath: string };
