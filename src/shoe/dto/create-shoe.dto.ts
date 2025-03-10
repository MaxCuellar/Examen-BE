import { Transform } from "class-transformer";
import { IsBoolean, IsLowercase, IsNumber, IsOptional, IsPositive, isString, IsString, MinLength } from "class-validator";
export class CreateShoeDto {
    
        @IsString()
        @MinLength(1)
        @Transform(({ value }) => value.toLowerCase()) // Convierte a minúsculas automáticamente
        @IsLowercase()
        name: string;
    
        @IsString()
        @MinLength(4)   
        @Transform(({ value }) => value.toLowerCase()) // Convierte a minúsculas automáticamente
        @IsLowercase()
        brand: string;

        @IsNumber()
        @IsPositive()
        size: number;

        @IsNumber()
        @IsPositive()
        price: number;
        
        @IsOptional()
        @IsNumber()
        @Transform(({ value }) => value ?? 0)  // Asigna 0 si no se proporciona
        @IsPositive()
        stock: number;
    
        @IsString()
        @Transform(({ value }) => value.toLowerCase()) // Convierte a minúsculas automáticamente
        @IsLowercase()
        gender: string;
    
        @IsString()
        @Transform(({ value }) => value.toLowerCase()) // Convierte a minúsculas automáticamente
        @IsLowercase()
        category: string;

        @IsOptional()
        @IsBoolean()    
        @Transform(({ value }) => value ?? true)  // Asigna 0 si no se proporciona
        active: boolean;

}
