// dtos/get-restaurants.dto.ts
import { IsNotEmpty, IsString, IsNumber, validateSync, IsOptional, IsPositive } from 'class-validator';

export class GetRestaurantsDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  distance: number;

  @IsOptional()
  @IsString()
  cuisine?: string;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  ratings?: number;


  constructor(data: Partial<GetRestaurantsDto>) {
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
