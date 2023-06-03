import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVehicleTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  id_brand: string;
}
