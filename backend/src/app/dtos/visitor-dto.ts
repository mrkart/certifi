import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../sanitizers/trim-sanitizer';

export class AddVistorDTO {
  @Trim()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;
}

export class LinkVisitorAndWalletDTO extends AddVistorDTO {
  @Trim()
  @IsString()
  @IsNotEmpty()
  public walletAddress: string;
}
