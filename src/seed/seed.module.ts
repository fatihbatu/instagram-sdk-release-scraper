import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Version, VersionSchema } from 'src/schemas/Version.schema';
import { Variant, VariantSchema } from 'src/schemas/Variant.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Version.name, schema: VersionSchema },
      { name: Variant.name, schema: VariantSchema },
    ]),
    HttpModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
