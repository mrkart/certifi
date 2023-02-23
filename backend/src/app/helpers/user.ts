import { Slot } from '../models/entities/Slot';

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

    PlatformInfo: Platform;
}
