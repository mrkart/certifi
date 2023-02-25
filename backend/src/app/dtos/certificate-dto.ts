import { IsNotEmpty, IsNumberString } from 'class-validator';

export class NftIdUrlParamDTO {
    @IsNumberString()
    @IsNotEmpty()
    nftId: string;
}
