import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Shoe } from './entities/shoe.entity';
import { Model } from 'mongoose';
import { RestockShoeDto } from './dto/restock-shoe.dto';

@Injectable()
export class ShoeService {

  constructor(

    @InjectModel(Shoe.name)
    private readonly shoeModel: Model<Shoe>,

  ) { }

  async create(createShoeDto: CreateShoeDto) {

    const { name, brand, gender, category, size, ...rest } = createShoeDto;

    const normalizedShoe = {
      name: name.toLowerCase().concat(' ').concat(size.toString()),
      brand: brand.toLowerCase(),
      gender: gender.toLowerCase(),
      size: size,
      category: category.toLowerCase(),
      ...rest,
    };

    try {

      const createdShoe = await this.shoeModel.create(normalizedShoe);

      return createdShoe;

    } catch (error) {
      this.handleErrors(error);
    }

  }

  async restock(restockShoeDto: RestockShoeDto) {

    const { id, newStock } = restockShoeDto;

    try {

      const foundShoe = await this.shoeModel.findById(id);

      if (!foundShoe || !foundShoe.active) {
        return this.handleNotFound(id);
      }

      foundShoe.stock += newStock;

      return await foundShoe.save();

    } catch (error) {
      this.handleErrors(error)
    }
  }

  async findAll() {

    try {

      return await this.shoeModel.find({ active: true });

    } catch (error) {
      this.handleErrors(error);
    }

  }

  async findOne(id: string) {
    try {

      const foundShoe = await this.shoeModel.findOne({ _id: id, active: true });

      if (!foundShoe) {
        this.handleNotFound(id);
        return;
      }

      return foundShoe;

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async update(id: string, updateShoeDto: UpdateShoeDto) {
    try {

      const foundShoe = await this.shoeModel.findByIdAndUpdate(id, updateShoeDto, { new: true });

      if (!foundShoe) {
        this.handleNotFound(id);
      }

      return foundShoe;

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async delete(id: string) {
    try {
      const foundShoe = await this.shoeModel.findById(id);

      if (!foundShoe || !foundShoe.active) {
        return this.handleNotFound(id);
      }

      foundShoe.active = false;
      await foundShoe.save();

      return { message: 'Shoe marked as inactive' };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  handleNotFound(id: string) {
    throw new NotFoundException(`Shoe with id: ${id} not found or is inactive`);
  }

  handleErrors(error: any) {

    throw new BadRequestException(`An error occurred: ${error.message || error}`);
  }
}
