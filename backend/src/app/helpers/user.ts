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
