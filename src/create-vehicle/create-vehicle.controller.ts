import { Controller, Post, Body, Get, Req} from '@nestjs/common';
import { CreateVehicleService } from './create-vehicle.service';
import { CreatePricelistDto } from './dto/create-createVehicle.dto';
import { Request } from 'express';


@Controller('create-vehicle')
export class CreateVehicleController {
    constructor(
        private readonly createVehicleService: CreateVehicleService,
    ) {}

    @Post()
  async createPricelist(@Body() createPricelistDto: CreatePricelistDto, @Req() req: Request) {
    return this.createVehicleService.create(createPricelistDto, req);
  }

  @Get()
    async findAll() {
        return this.createVehicleService.getAll();
    }
}
