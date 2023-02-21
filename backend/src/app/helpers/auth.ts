import {
    Organisation,
    Profile,
    Role
} from '../models/repositories/user-repository';

export class AuthUser implements Profile {
    id: number;
    name: string;
    roles: Role[];
    organistaions: Organisation[];
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}

export class UserRefreshPayload {
    userId: number;
    refreshTokenId: string;
}

export class UserCredentials {
    constructor(public accessToken: string, public refreshToken: string) {}
}

export class AuthUserFactory {
    public static createAuthUser(profile: Profile): AuthUser {
        const authUser = new AuthUser();
        authUser.id = profile.id;
        authUser.name = profile.name;
        authUser.organistaions = profile.organistaions;
        authUser.roles = profile.roles;
        return authUser;
    }
}
