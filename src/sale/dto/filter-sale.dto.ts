import { Transform } from 'class-transformer';
import { IsLowercase, IsOptional, IsString } from 'class-validator';

export class FilterSalesDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ? value.toLowerCase() : value)
  @IsLowercase()
  brand?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ? value.toLowerCase() : value)
  @IsLowercase()
  gender?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ? value.toLowerCase() : value)
  @IsLowercase()
  category?: string;
}
