import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { ShoeService } from 'src/shoe/shoe.service';
import { ShoeModule } from 'src/shoe/shoe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './entities/sale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ShoeModule, 
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
