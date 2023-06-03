import { Controller, Get, Query} from '@nestjs/common';
import { VehicleYearsService } from './vehicle-years.service';
import { ParseArrayPipe } from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
@Controller('vehicle-years')
export class VehicleYearsController {
    constructor(
        private readonly vehicleYearsService: VehicleYearsService,
    ) {}

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.vehicleYearsService.getAll(page, limit);
    }

    @Get()
    async findYear(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('year', new ParseArrayPipe({ items: String, separator: ',' })) year: string[],
    ): Promise<any> {
        return this.vehicleYearsService.getYear(page, limit, year);
    }
}
