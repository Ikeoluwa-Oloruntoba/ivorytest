import { Restaurant } from "@prisma/client";
import { RestaurantResponse } from "./restaurantResp.interface";
import { CreateRestaurantDto } from "src/dto/CreateRestaurant.dto";
import { UpdateRestaurantDto } from "src/dto/UpdateRestaurant.dto";

export interface IRestaurant {

    getRestaurantByAny(identifier: any): Promise<Restaurant>;

    getRestaurantByCity(city: string): Promise<Restaurant>;

    getRestaurantsWithinCity(whereConditions: any): Promise<RestaurantResponse[]>;

    getRestaurantById(id: number): Promise<Restaurant>;

    getRestaurantsWithinCity(whereConditions: any): Promise<RestaurantResponse[]>;
    
    getRestaurantById(id: number): Promise<Restaurant>;

    createRestaurant(restaurant: CreateRestaurantDto): Promise<Restaurant>;

    updateRestaurant(id: number, restaurant: UpdateRestaurantDto): Promise<Restaurant>

    deleteRestaurant(id: number): Promise<object>; 
}