import { IsMongoId, IsNumber} from "class-validator";

export class RestockShoeDto {

    @IsMongoId()
    readonly id: string;   

    @IsNumber()
    readonly newStock: number; 
  }
  