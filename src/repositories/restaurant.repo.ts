import { Injectable } from "@nestjs/common";
import { Restaurant } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateRestaurantDto } from "src/dto/CreateRestaurant.dto";
import { UpdateRestaurantDto } from "src/dto/UpdateRestaurant.dto";
import { IRestaurant } from "src/interfaces/restaurant.interface";
import { RestaurantResponse } from "src/interfaces/restaurantResp.interface";


@Injectable()
export class PrismaRestaurantRepository implements IRestaurant {

    constructor(private prisma: PrismaService) {}


    async getRestaurantByAny(identifier: any): Promise<Restaurant>{

        const id = Number(identifier);

        console.log(id)

        if (typeof id != 'string' && !Number.isNaN(id)) {
        // If identifier is a valid number, search by id
        const findRestaurantById = await this.prisma.restaurant.findFirst({
            where: {
            id,
            },
      
        });

        return findRestaurantById;
    }

        const findRestaurant = await this.prisma.restaurant.findFirst({
            where: {
            OR: [
                { name: {
                    contains: identifier.toString(),
                    mode: 'insensitive',
                }}, 
                { address:  {
                    contains: identifier.toString(),
                    mode: 'insensitive',
                } }, 

                { city:  {
                    contains: identifier.toString(),
                    mode: 'insensitive',
                } }],
        },
       
        });

        return findRestaurant;
    }

    async getRestaurantByCity(city: string): Promise<Restaurant>{

        const findCity = await this.prisma.restaurant.findFirst({
            where: {
                city: city.toString()
            },
          });

          return findCity;
    }


    async getRestaurantsWithinCity(whereConditions: any): Promise<RestaurantResponse[]> {
        const restaurants = await this.prisma.restaurant.findMany({
          where: whereConditions,
          select: {
            name: true,
            address: true,
            latitude: true,
            longitude: true,
          },
        });
      
        return restaurants;
      }

    async getRestaurantById(id: number): Promise<Restaurant> {
        return this.prisma.restaurant.findUnique({
        where: { id },
        });
    }

    async createRestaurant(restaurant: CreateRestaurantDto): Promise<Restaurant> {
        return this.prisma.restaurant.create({
        data: restaurant,
        });
    }

    async updateRestaurant(id: number, restaurant: UpdateRestaurantDto): Promise<Restaurant> {
        return this.prisma.restaurant.update({
        where: { id },
        data: restaurant,
        });
    }

    async deleteRestaurant(id: number): Promise<object> {
        await this.prisma.restaurant.delete({
        where: { id },
        });

        return {message: 'restaurant deleted'};
    }



}