import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { VehicleYearsModule } from './vehicle-years/vehicle-years.module';
import { PricelistModule } from './pricelist/pricelist.module';
import { VehicleBrandsModule } from './vehicle-brands/vehicle-brands.module';
import { VehicleTypesModule } from './vehicle-types/vehicle-types.module';
import { VehicleModelsModule } from './vehicle-models/vehicle-models.module';
import { CreateVehicleModule } from './create-vehicle/create-vehicle.module';
import { UsersModule } from './users/users.module';
import { JwtMiddleware } from './middleware/JwtMiddleware.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VehicleYearsModule, PricelistModule, VehicleBrandsModule, VehicleTypesModule, VehicleModelsModule, CreateVehicleModule, UsersModule],
  controllers: [],
  providers: [JwtMiddleware],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('create-vehicle');
  }
}
