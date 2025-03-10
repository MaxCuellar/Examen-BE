import { Transform } from "class-transformer";
import { IsBoolean, IsLowercase, IsNumber, IsOptional, IsPositive, isString, IsString, MinLength } from "class-validator";
export class CreateShoeDto {
    
        @IsString()
        @MinLength(1)
        @Transform(({ value }) => value.toLowerCase()) 
        @IsLowercase()
        name: string;
    
        @IsString()
        @MinLength(1)   
        @Transform(({ value }) => value.toLowerCase()) 
        @IsLowercase()
        brand: string;

        @IsNumber()
        @IsPositive()
        size: number;

        @IsNumber()
        @IsPositive()
        price: number;
    
        @IsString()     
        @Transform(({ value }) => value.toLowerCase()) 
        @IsLowercase()
        gender: string;
    
        @IsString()
        @Transform(({ value }) => value.toLowerCase()) 
        @IsLowercase()
        category: string;

        @IsOptional()
        @IsBoolean()    
        @Transform(({ value }) => value ?? true)  
        active?: boolean;

}
