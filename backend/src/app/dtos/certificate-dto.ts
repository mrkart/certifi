import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class NftIdUrlParamDTO {
    @IsNumberString()
    @IsNotEmpty()
    nftId: string;
}

export class CertificaeNumberUrlParamDTO {
    @IsString()
    @IsNotEmpty()
    certificateNumber: string;
}

export class CertificaeFileNameUrlParamDTO {
    @IsString()
    @IsNotEmpty()
    fileName: string;
}
