import { Module } from '@nestjs/common';
import { VehicleYearsController } from './vehicle-years.controller';
import { VehicleYearsService } from './vehicle-years.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicle_years } from './entity/vehicle-years.entity';
import { pricelist } from 'src/pricelist/entity/pricelist.entity';
import { vehicle_brands } from 'src/vehicle-brands/entity/vehicle-brands.entity';
import { vehicle_types } from 'src/vehicle-types/entity/vehicle-types.entity';
import { vehicle_models } from 'src/vehicle-models/entity/vehicle-models.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([vehicle_years, pricelist, vehicle_brands, vehicle_types, vehicle_models])],
  controllers: [VehicleYearsController],
  providers: [VehicleYearsService]
})
export class VehicleYearsModule {}
