import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './entities/sale.entity';
import { Model } from 'mongoose';
import { Shoe } from 'src/shoe/entities/shoe.entity';
import { FilterSalesDto } from './dto/filter-sale.dto';

@Injectable()
export class SaleService {

  constructor(
    @InjectModel(Sale.name)
    private readonly saleModel: Model<Sale>,

    @InjectModel(Shoe.name)
    private readonly shoeModel: Model<Shoe>,
  ) { }

  async create(createSaleDto: CreateSaleDto) {

    const { shoeId, quantity } = createSaleDto;

    try {

      const shoe = await this.getShoeById(shoeId);

      if (quantity > shoe.stock) {
        throw new BadRequestException('Insufficient stock');
      }

      const totalPrice = quantity * shoe.price;

      const sale = await this.saleModel.create({
        shoeId,
        quantity,
        totalPrice,
      });

      shoe.stock -= quantity;

      await shoe.save();

      return sale;

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    try {

      return await this.saleModel.find();

    } catch (error) {
      this.handleErrors(error);
    }

  }

  async findOne(id: string) {

    const foundSale = await this.saleModel.findById(id);

    if (!foundSale) {
      throw new NotFoundException(`Sale with id: ${id} not found`);
    }
    return foundSale;
  }

  async findAllFiltered(filterSalesDto: FilterSalesDto) {
    const matchStage: any = {};
  
    if (filterSalesDto.brand) {
      matchStage['shoe.brand'] = filterSalesDto.brand.toLowerCase();
    }
  
    if (filterSalesDto.gender) {
      matchStage['shoe.gender'] = filterSalesDto.gender.toLowerCase();
    }
  
    if (filterSalesDto.category) {
      matchStage['shoe.category'] = filterSalesDto.category.toLowerCase();
    }
  
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'shoes',
          localField: 'shoeId',
          foreignField: '_id',
          as: 'shoe',
        },
      },
      {
        $unwind: '$shoe',
      },
    ];
  
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }
  
    return await this.saleModel.aggregate(pipeline);
  }
  
  async getShoeById(id: string) {

    const shoe = await this.shoeModel.findById(id);

    if (!shoe ||!shoe.active) {

      throw new NotFoundException(`Shoe with id ${id} not found`);

    }
    return shoe;
  }

  handleErrors(error: any) {
    throw new BadRequestException(`An error occurred: ${error.message || error}`);
  }

}
