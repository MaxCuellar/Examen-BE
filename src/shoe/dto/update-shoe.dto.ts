import { PartialType } from '@nestjs/mapped-types';
import { CreateShoeDto } from './create-shoe.dto';
import { Exclude } from 'class-transformer';

export class UpdateShoeDto extends PartialType(CreateShoeDto) {
  @Exclude() // Excluye este campo para que no se pueda modificar
  stock: number;
}
