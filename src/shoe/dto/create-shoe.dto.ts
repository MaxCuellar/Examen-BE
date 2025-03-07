import { IsBoolean, IsLowercase, IsNumber, IsPositive, isString, IsString, MinLength } from "class-validator";




export class CreateShoeDto {
    
        @IsString()
        @MinLength(1)
        name: string;
    
        @IsString()
        @MinLength(4)   
        @IsLowercase()
        brand: string;

        @IsNumber()
        @IsPositive()
        size: number;

        @IsNumber()
        @IsPositive()
        price: number;
    
        @IsNumber()
        stock: number;
    
        @IsString()
        @IsLowercase()
        gender: string;
    
        @IsString()
        @IsLowercase()
        category: string;

        @IsBoolean()    
        active: boolean;

}
