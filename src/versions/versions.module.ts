import { Module } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { VersionsController } from './versions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Version, VersionSchema } from 'src/schemas/Version.schema';
import { Variant, VariantSchema } from 'src/schemas/Variant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Version.name, schema: VersionSchema },
      { name: Variant.name, schema: VariantSchema },
    ]),
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
