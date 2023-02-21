import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsPhoneNumber,
    IsString
} from 'class-validator';
import { Trim } from '../sanitizers/trim-sanitizer';

export class UserIdUrlPramDTO {
    @IsNumberString()
    @IsNotEmpty()
    userId: string;
}

export class CreateUserDTO {
    @Trim()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Trim()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Trim()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @Trim()
    @IsString()
    @IsNotEmpty()
    slotName: string;
}
