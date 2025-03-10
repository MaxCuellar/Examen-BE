import { IsMongoId, IsNumber, IsPositive } from "class-validator";

export class CreateSaleDto {
    
    @IsMongoId()
    shoeId: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    // @IsNumber()
    // @IsPositive()    
    // totalPrice:number;
    
}
