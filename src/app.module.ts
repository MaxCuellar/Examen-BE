import { Module } from '@nestjs/common';
import { ShoeModule } from './shoe/shoe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/shoe-store'),
  ShoeModule,
  SaleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
