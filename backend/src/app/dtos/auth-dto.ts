import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../sanitizers/trim-sanitizer';

export class SignInDTO {
    @Trim()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Trim()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RefreshUserAccessDTO {
    @Trim()
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}
