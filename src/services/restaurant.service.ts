import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/dto/CreateRestaurant.dto';
import { GetRestaurantsDto } from 'src/dto/GetRestaurant.dto';
import { UpdateRestaurantDto } from 'src/dto/UpdateRestaurant.dto';
import { RestaurantResponse } from 'src/interfaces/restaurantResp.interface';
import { PrismaRestaurantRepository } from 'src/repositories/restaurant.repo';

@Injectable()
export class RestaurantService {

    constructor(
        private restaurantRepo: PrismaRestaurantRepository
    ){}



    async createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantResponse> {

        const createdRestaurant = await this.restaurantRepo.createRestaurant(createRestaurantDto);

        const response = {
            name: createdRestaurant.name,
            address: createdRestaurant.address,
            latitude: createdRestaurant.latitude,
            longitude: createdRestaurant.longitude,
          };
      
          return response;

      }


    async getRestaurantWithinDistance(data: GetRestaurantsDto): Promise<RestaurantResponse[]>{

        const { city, latitude, longitude, distance, maxPrice, minPrice, cuisine, ratings } = data;

        await this.isValidCity(city);

        const whereConditions: any = {
            city,
          };
      
          if (cuisine) {
            whereConditions.cuisines = {
              some: {
                equals: cuisine,
              },
            };
          }
      
      
          if (minPrice && maxPrice) {
            whereConditions.minPrice = {
              lte: Number(maxPrice),
              gte: Number(minPrice),
            };
      
            whereConditions.maxPrice = {
              lte: Number(maxPrice),
              gte: Number(minPrice),
            };
          }
      
          if (ratings) {
            whereConditions.ratings = {
              gte: Number(ratings),
            };
          }

        const getRestaurantsWithinCity = await this.restaurantRepo.getRestaurantsWithinCity(whereConditions);

        const getRestaurantWithDistance = await this.getRestaurantWithDistance(latitude, longitude, distance, getRestaurantsWithinCity);
      
        return getRestaurantWithDistance;
    }



    async getRestaurantByAny(identifier: any): Promise<RestaurantResponse>{

        const getRestaurant  = await this.restaurantRepo.getRestaurantByAny(identifier);

        if(!getRestaurant){
            throw new NotFoundException("No Restaurant Found");
        }

        const response = {
            name: getRestaurant.name,
            address: getRestaurant.address,
            latitude: getRestaurant.latitude,
            longitude: getRestaurant.longitude,
          };
      
        return response;

    }


    async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantResponse> {

        const existingRestaurant = await this.restaurantRepo.getRestaurantById(Number(id));

        if (!existingRestaurant) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }

        const updatedRestaurant = await this.restaurantRepo.updateRestaurant(Number(id), updateRestaurantDto);

        const response = {
            name: updatedRestaurant.name,
            address: updatedRestaurant.address,
            latitude: updatedRestaurant.latitude,
            longitude: updatedRestaurant.longitude,
          };

          return response
    }
    


    async deleteRestaurant(id: number) {
        const existingRestaurant = await this.restaurantRepo.getRestaurantById(Number(id));

        if (!existingRestaurant) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }

        return this.restaurantRepo.deleteRestaurant(Number(id));
    }


    //Private Methodes 

    private async getRestaurantWithDistance(
        latitude: number,
        longitude: number,
        distance: number,
        restaurants: RestaurantResponse[],
      ): Promise<RestaurantResponse[]> {
        // Filter restaurants based on distance
        const nearbyRestaurants = await Promise.all(
            restaurants.map(async (restaurant) => {
              const restaurantDistance = await this.calculateHaversineDistance(
                latitude,
                longitude,
                restaurant.latitude,
                restaurant.longitude
              );

              console.log(restaurantDistance);
          
              return { ...restaurant, distance: restaurantDistance };
            })
          );
          
          const filteredRestaurants = nearbyRestaurants.filter((restaurant) => restaurant.distance < distance);

          return filteredRestaurants;
      }

    //Haversine Distance Calulation
    private async calculateHaversineDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
      ): Promise<number> {
        const R = 6371; // Radius of the Earth in kilometers
      
        const dLat = await this.toRadians(lat2 - lat1);
        const dLon = await this.toRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(await this.toRadians(lat1)) *
            Math.cos(await this.toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = R * c; // Distance in kilometers
      
        //convert to meters
        return distance * 1000;
      }


      private async toRadians(degrees: number): Promise<number> {
        return degrees * (Math.PI / 180);
      }


      //Check If city is Valid
      private async isValidCity(city: string) {

        const findCity = await this.restaurantRepo.getRestaurantByCity(city)
       
      
        if (!findCity) {
          throw new NotFoundException(`City "${city}" is not valid or not supported.`);
        }
      }
      
}
