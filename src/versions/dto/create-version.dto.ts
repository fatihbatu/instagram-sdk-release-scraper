import { IsNumber, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  versionId?: string;

  @IsString()
  href?: string;

  @IsString()
  releaseDate?: string;

  @IsNumber()
  variantCount?: number;
}
