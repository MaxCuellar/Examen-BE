import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FilterSalesDto } from './dto/filter-sale.dto';

@Controller('sales')
export class SaleController {

  constructor(private readonly saleService: SaleService) { }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {

    return this.saleService.create(createSaleDto);

  }

  @Get()
  findAll() {

    return this.saleService.findAll();

  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.saleService.findOne(id);

  }

  @Post("details")
  findAllFiltered(@Body() filterSalesDto: FilterSalesDto) {

    return this.saleService.findAllFiltered(filterSalesDto);

  }

}
