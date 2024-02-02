import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, validateSync } from 'class-validator';

export class CreateRestaurantDto {
    
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsArray()
  cuisines: string[];


  @IsOptional()
  @IsNumber()
  minPrice: number;


  @IsOptional()
  @IsNumber()
  maxPrice: number;


  constructor(data: Partial<CreateRestaurantDto>) {
    Object.assign(this, data);
  }

  validate(): string | null {
    const errors = validateSync(this);
    if (errors.length > 0) {
      return Object.values(errors[0].constraints)[0];
    }
    return null;
  }

}

