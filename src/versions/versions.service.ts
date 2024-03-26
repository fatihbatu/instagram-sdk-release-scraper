import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVersionDto } from './dto/update-version.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Version } from 'src/schemas/Version.schema';
import { Model } from 'mongoose';

@Injectable()
export class VersionsService {
  constructor(
    @InjectModel(Version.name) private versionModel: Model<Version>,
  ) {}

  findAll() {
    const versions = this.versionModel.find().exec();
    if (!versions) throw new NotFoundException('No versions found');
    return versions;
  }

  findOne(id: number) {
    const version = this.versionModel.findById(id).exec();
    if (!version) throw new NotFoundException(`Version #${id} not found`);
    return version;
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    const version = this.versionModel
      .findByIdAndUpdate(id, updateVersionDto, { new: true })
      .exec();
    if (!version) throw new NotFoundException(`Version #${id} not found`);
    return version;
  }

  remove(id: number) {
    const version = this.versionModel.findByIdAndDelete(id).exec();
    if (!version) throw new NotFoundException(`Version #${id} not found`);
    return version;
  }
}
