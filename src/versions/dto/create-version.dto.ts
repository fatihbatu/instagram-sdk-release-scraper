import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  @IsNotEmpty()
  versionId: string;

  @IsString()
  @IsNotEmpty()
  href: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsNumber()
  @IsNotEmpty()
  variantCount: number;
}
