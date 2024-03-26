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

  findAll() {
    const variants = this.variantModel.find().exec();
    if (!variants) throw new NotFoundException('No variants found');
    return variants;
  }

  findOne(id: string) {
    const variant = this.variantModel.findById(id).exec();
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    return variant;
  }

  update(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = this.variantModel
      .findByIdAndUpdate(id, updateVariantDto, { new: true })
      .exec();
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    return variant;
  }

  remove(id: string) {
    const variant = this.variantModel.findByIdAndDelete(id).exec();
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    return variant;
  }
}
