import { Course } from '../models/entities/Course';

export interface Role {
    id: number;
    name: string;
}

export interface Organisation {
    id: number;
    name: string;
}

export interface Profile {
    id: number;
    name: string;
    roles: Role[];
    organistaions: Organisation[];
    flowAddress?: string;
}

export interface OrgUserSlot {
    id: number;
    name: string;
}

export interface OrgUser extends Profile {
    email: string;
    phone: string;
    password: string;
    slot: OrgUserSlot[];
}

export type OrgUserResponse = Omit<OrgUser, 'password'>;

export interface CertificateData {
    course: string;
    certNumber: string;
    batchInfo: string;
    gradeInfo: string;
}

export interface Issuer {
    insitution: string;
    institutionID: string;
    Description: string;
    issuedDate: string;
}

export interface CertificateAsset {
    templateID: string;
    uri: string;
    size: number;
    mimeType: string;
    dimensions: string | null;
}

export interface Signer {
    address: string;
    signerID: string;
}

export interface Platform {
    Platform: string;
    MintedAt: string;
}
export interface CertificateMetadata {
    docType: string;
    holderName: string;
    holder: string;

    CertData: CertificateData;

    Issuer: Issuer;

    Cert: CertificateAsset;

    Signer1: Signer;

    Signer2: Signer;

    Signer3: Signer;

    PlatformInfo: Platform;
}
export interface IpfsAccessToken {
    token_type: string;
    issued_at: string;
    access_token: string;
    status: string;
}

export interface IpfsAccessRequest {
    client_id: string;
    client_secret: string;
}

export interface IpfsUploadResponse {
    Name: string;
    Hash: string;
    Size: string;
    error?: boolean;
    Resp?: string;
    resval?: string;
}

export interface MintEventData {
    id: string;
    content: string;
    owner: string;
    insitution: string;
}

export interface CertificateResponse {
    certificateHash: string;
    certificateNumber: string;
    course: Pick<Course, 'id' | 'name'>;
    datetimeCreated: Date;
    email: string;
    grade: string;
    id: number;
    nftId: number;
    org: Organisation;
    slot: OrgUserSlot;
    thumbnailPath: string;
}
