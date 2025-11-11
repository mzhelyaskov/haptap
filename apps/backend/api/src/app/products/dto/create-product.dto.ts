import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}