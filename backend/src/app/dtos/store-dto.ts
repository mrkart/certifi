import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches
} from 'class-validator';

export class DomainUrlParamDTO {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  public domain: string;
}

export class StoreUuidUrlParamDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  public uuid: string;
}

export class SectionIdUrlParamDTO {
  @IsNumberString()
  @IsString()
  @IsNotEmpty()
  public sectionId: string;
}

export class DropIdUrlParamDTO {
  @IsNumberString()
  @IsNotEmpty()
  public dropId: string;
}

export class RandomDropQueryParamDTO {
  @IsNumberString()
  @IsNotEmpty()
  public markedPrice: string;

  @IsBooleanString()
  @IsNotEmpty()
  public random: string;
}

export class GroupedDropFilterQueriesDTO {
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  public recordLimit?: string;

  @IsBooleanString()
  @IsNotEmpty()
  @IsOptional()
  public isRandom?: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  public offset?: string;
}

export class FileNameUrlParamDTO {
  @Matches(/^[\w,\s-]+\.[A-Za-z]{3,5}$/, {
    message: '$property should be valid file name'
  })
  @IsString()
  @IsNotEmpty()
  public fileName: string;
}

export class ItemIdUrlParamDTO {
  @IsNumberString()
  @IsString()
  @IsNotEmpty()
  public itemId: string;
}
