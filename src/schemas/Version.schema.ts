import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Version {
  @Prop({ required: true, unique: true })
  versionId: string;

  @Prop({ required: true })
  href: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  variantCount: number;
}

export const VersionSchema = SchemaFactory.createForClass(Version);

VersionSchema.virtual('variants', {
  ref: 'Variant',
  localField: '_id',
  foreignField: 'version',
  justOne: false,
});

VersionSchema.set('toObject', { virtuals: true });
VersionSchema.set('toJSON', { virtuals: true });
