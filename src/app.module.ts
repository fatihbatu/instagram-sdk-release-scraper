import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VariantsModule } from './variants/variants.module';
import { VersionsModule } from './versions/versions.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/scraper'),
    VariantsModule,
    VersionsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
