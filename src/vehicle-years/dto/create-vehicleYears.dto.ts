// vehicleYears.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleYearDto {
  @IsNotEmpty()
  @IsString()
  year: string;
}
