import { Module } from '@nestjs/common';
import { ShoeService } from './shoe.service';
import { ShoeController } from './shoe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shoe, ShoeSchema } from './entities/shoe.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Shoe.name, schema: ShoeSchema}])],
  controllers: [ShoeController],
  providers: [ShoeService], 
  exports: [ShoeService, MongooseModule]
})
export class ShoeModule {}