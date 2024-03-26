import { IsNumber, IsString } from 'class-validator';

export class UpdateVersionDto {
  @IsString()
  versionId?: string;

  @IsString()
  href?: string;

  @IsString()
  releaseDate?: string;

  @IsNumber()
  variantCount?: number;
}
