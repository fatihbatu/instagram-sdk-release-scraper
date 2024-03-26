import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Version } from './Version.schema';

@Schema()
export class Variant {
  @Prop({ required: true })
  variantId: string;

  @Prop({ required: true })
  arc: string;

  @Prop({ required: true })
  minSdk: string;

  @Prop({ required: true })
  dpi: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Version',
    required: true,
  })
  version: Version;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
