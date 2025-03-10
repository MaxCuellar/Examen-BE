import { IsMongoId, IsNumber, IsPort, IsPositive } from "class-validator";

export class RestockShoeDto {

    @IsMongoId()
    readonly id: string;   // ID del zapato

    @IsNumber()
    @IsPositive()
    readonly newStock: number; // Cantidad a agregar al stock
  }
  