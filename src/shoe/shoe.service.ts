import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Shoe } from './entities/shoe.entity';
import { Model } from 'mongoose';
import { isMongoId } from 'class-validator';
import { RestockShoeDto } from './dto/restock-shoe.dto';

@Injectable()
export class ShoeService {
  constructor(
    @InjectModel(Shoe.name)
    private readonly shoeModel: Model<Shoe>,
  ) {}

  async create(createShoeDto: CreateShoeDto) {
    const { name, brand, gender, category, size, ...rest } = createShoeDto;

    const normalizedShoe = {
      name: name.toLowerCase().concat(' ').concat(size.toString()), // Concatenar un espacio y luego la talla
      brand: brand.toLowerCase(),
      gender: gender.toLowerCase(),
      size: size,
      category: category.toLowerCase(),
      ...rest, // Mantiene el resto de las propiedades sin cambios
    };

    const createdShoe = await this.shoeModel.create(normalizedShoe);

    return createdShoe;
  }

  async restock(restockShoeDto: RestockShoeDto) {
    const { id, newStock } = restockShoeDto;

    const foundShoe = await this.findOne(id);

    foundShoe.stock += newStock;

    const restockedShoe = await foundShoe.save();

    return restockedShoe;
  }

  async findAll() {
    return await this.shoeModel.find().exec();
  }

  async findOne(id: string) {
    const foundShoe = await this.shoeModel.findById(id).exec();

    if (!foundShoe) {
      throw new NotFoundException(`Shoe with id: ${id} not found`);
    }
    return foundShoe;
  }

  async update(id: string, updateShoeDto: UpdateShoeDto) {

    const foundShoe = await this.shoeModel.findByIdAndUpdate(
      {
        _id: id,
        updateShoeDto,
      },
      { new: true },
    );

    const updatedShoe = await foundShoe.save()

    return updatedShoe;
  }

  async remove(id: number) {

    await this.shoeModel.findByIdAndDelete(id)

    return {
      message: "done"
    };
  }
}
