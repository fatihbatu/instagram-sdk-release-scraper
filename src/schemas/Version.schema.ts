import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Version {
  @Prop({ required: true, unique: true })
  verisonId: string;

  @Prop({ required: true })
  href: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  variantCount: number;
}
export const VersionSchema = SchemaFactory.createForClass(Version);
