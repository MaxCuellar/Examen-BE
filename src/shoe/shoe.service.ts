import { Injectable } from '@nestjs/common';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Shoe } from './entities/shoe.entity';
import { Model } from 'mongoose';

@Injectable()
export class ShoeService {

  constructor(

    @InjectModel(Shoe.name)
    private readonly shoeModel: Model<Shoe>

  ) { }

  async create(createShoeDto: CreateShoeDto){

    const createdShoe = await this.shoeModel.create(createShoeDto);

    return createdShoe;
  }

  async findAll(): Promise<Shoe[]> {
    return this.shoeModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} shoe`;
  }

  update(id: number, updateShoeDto: UpdateShoeDto) {
    return `This action updates a #${id} shoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoe`;
  } 
}
