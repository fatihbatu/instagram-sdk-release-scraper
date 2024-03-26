import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVersionDto } from './dto/update-version.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Version } from 'src/schemas/Version.schema';
import { Model } from 'mongoose';
import { Variant } from 'src/schemas/Variant.schema';

@Injectable()
export class VersionsService {
  constructor(
    @InjectModel(Version.name) private versionModel: Model<Version>,
    @InjectModel(Variant.name) private variantModel: Model<Variant>,
  ) {}

  async findAll(): Promise<Version[]> {
    const versions = await this.versionModel.find().exec();
    if (!versions) throw new NotFoundException('No versions found');
    return versions;
  }

  async findOne(id: string): Promise<Version> {
    const version = await this.versionModel
      .findById(id)
      .populate({
        path: 'variants',
        model: this.variantModel,
        strictPopulate: false,
      })
      .exec();
    if (!version) throw new NotFoundException(`Version #${id} not found`);
    return version;
  }

  async update(id: string, updateVersionDto: UpdateVersionDto) {
    const version = await this.versionModel
      .findByIdAndUpdate(id, updateVersionDto, { new: true })
      .exec();
    if (!version) throw new NotFoundException(`Version #${id} not found`);
    return version;
  }

  async remove(id: string) {
    const version = await this.versionModel
      .findByIdAndDelete(id)
      .exec()
      .then(async (version) => {
        await this.variantModel.deleteMany({ versionId: id }).exec();
        return version;
      });
    if (!version) throw new NotFoundException(`Version #${id} not found`);
    return version;
  }
}
