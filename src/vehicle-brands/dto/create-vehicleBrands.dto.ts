// vehicleBrands.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
