// vehicleModels.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVehicleModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  id_type: string;
}
