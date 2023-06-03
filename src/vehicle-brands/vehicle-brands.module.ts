import { Module } from '@nestjs/common';
import { VehicleBrandsController } from './vehicle-brands.controller';
import { VehicleBrandsService } from './vehicle-brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicle_brands } from './entity/vehicle-brands.entity';

@Module({
  controllers: [VehicleBrandsController],
  providers: [VehicleBrandsService],
  
})
export class VehicleBrandsModule {}
