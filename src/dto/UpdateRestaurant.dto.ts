// dtos/update-restaurant.dto.ts
import { IsOptional, IsString, IsNumber, IsArray, validateSync } from 'class-validator';

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsArray()
  cuisines?: string[];

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;


  constructor(data: Partial<UpdateRestaurantDto>) {
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
