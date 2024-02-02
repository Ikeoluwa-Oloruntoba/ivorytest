import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaRestaurantRepository } from './repositories/restaurant.repo';
import { RateLimiterMiddleware } from './middlewares/ratelimiter.middleware';



@Module({
  imports: [PrismaModule],
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaRestaurantRepository],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes('v1/restaurants*');
  }
}
