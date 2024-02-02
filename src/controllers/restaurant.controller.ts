import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { GetRestaurantsDto } from 'src/dto/GetRestaurant.dto';
import { CreateRestaurantDto } from 'src/dto/CreateRestaurant.dto';
import { RestaurantResponse } from 'src/interfaces/restaurantResp.interface';
import { UpdateRestaurantDto } from 'src/dto/UpdateRestaurant.dto';

@Controller('v1/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}


  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Restaurant' })
  @ApiBody({
    type: GetRestaurantsDto,
    description: 'Get All Restaurant',
  })
  async getRestaurant(@Query() data: any) {
    const dto = new GetRestaurantsDto(data);
    const errorMessage = dto.validate();
    if (errorMessage) {
      throw new BadRequestException(errorMessage);
    }

    return this.restaurantService.getRestaurantWithinDistance(data);
  }



  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Restaurant' })
  @ApiBody({
    type: CreateRestaurantDto,
    description: 'Create a new Restaurant',
  })
  async createRestaurant(@Body() data: any) {

    const dto = new CreateRestaurantDto(data);
    const errorMessage = dto.validate();
    if (errorMessage) {
      throw new BadRequestException(errorMessage);
    }
    return await this.restaurantService.createRestaurant(data);
   
 }


 @Get(':identifier')
 async getSingleRestaurant(@Param('identifier') id: any): Promise<RestaurantResponse> {
   return await this.restaurantService.getRestaurantByAny(id);
 }


 @Put(':id')
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ summary: 'Update Restaurant' })
 @ApiBody({
   type: UpdateRestaurantDto,
   description: 'Update a Restaurant',
 })
 async updateRestaurant(@Param('id') id: number, @Body() data: any): Promise<RestaurantResponse> {
  const dto = new UpdateRestaurantDto(data);
  const errorMessage = dto.validate();
  if (errorMessage) {
    throw new BadRequestException(errorMessage);
  }
   return this.restaurantService.updateRestaurant(id, data);
 }


 @Delete(':id')
 async deleteRestaurant(@Param('id') id: number){
  
   const response = await this.restaurantService.deleteRestaurant(id);
   return response;
 }

}

