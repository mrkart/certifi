import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserIdUrlPramDTO {
    @IsNumberString()
    @IsNotEmpty()
    userId: string;
}
