import { Module } from '@nestjs/common';
import { VehicleModelsController } from './vehicle-models.controller';
import { VehicleModelsService } from './vehicle-models.service';
import { vehicle_models } from './entity/vehicle-models.entity';

@Module({
  controllers: [VehicleModelsController],
  providers: [VehicleModelsService],
})
export class VehicleModelsModule {}
