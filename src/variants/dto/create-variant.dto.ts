import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  variantId?: string;

  @IsNotEmpty()
  @IsString()
  arc?: string;

  @IsNotEmpty()
  @IsString()
  relminSdkeaseDate?: string;

  @IsNotEmpty()
  @IsString()
  dpi?: string;
}
