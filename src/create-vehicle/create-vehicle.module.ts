import { Module } from '@nestjs/common';
import { CreateVehicleService } from './create-vehicle.service';
import { CreateVehicleController } from './create-vehicle.controller';
import { vehicle_brands } from '../vehicle-brands/entity/vehicle-brands.entity'; // Import the entity
import { vehicle_types } from '../vehicle-types/entity/vehicle-types.entity';
import { vehicle_models } from '../vehicle-models/entity/vehicle-models.entity';
import { vehicle_years } from '../vehicle-years/entity/vehicle-years.entity';
import { pricelist } from '../pricelist/entity/pricelist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      vehicle_brands,
      vehicle_types,
      vehicle_models,
      vehicle_years,
      pricelist,
    ]),
  ],
  providers: [CreateVehicleService],
  controllers: [CreateVehicleController]
})
export class CreateVehicleModule {}
