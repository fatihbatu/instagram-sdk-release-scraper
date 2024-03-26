import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Variant } from 'src/schemas/Variant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variant.name) private variantModel: Model<Variant>,
  ) {}

  async findAll() {
    const variants = await this.variantModel.find().exec();
    if (!variants) throw new NotFoundException('No variants found');
    return variants;
  }

  async findOne(id: string) {
    const variant = await this.variantModel.findById(id).exec();
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    return variant;
  }

  async update(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = await this.variantModel
      .findByIdAndUpdate(id, updateVariantDto, { new: true })
      .exec();
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    return variant;
  }

  async remove(id: string) {
    const variant = await this.variantModel.findByIdAndDelete(id).exec();
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    return variant;
  }
}
