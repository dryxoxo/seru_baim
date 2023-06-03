import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { vehicle_years } from './entity/vehicle-years.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pricelist } from 'src/pricelist/entity/pricelist.entity';
import { vehicle_brands } from 'src/vehicle-brands/entity/vehicle-brands.entity';
import { vehicle_types } from 'src/vehicle-types/entity/vehicle-types.entity';
import { vehicle_models } from 'src/vehicle-models/entity/vehicle-models.entity';


@Injectable()
export class VehicleYearsService {
  constructor(
    @InjectRepository(vehicle_brands)
    private vehicleBrandsRepository: Repository<vehicle_brands>,
    @InjectRepository(vehicle_types)
    private vehicleTypesRepository: Repository<vehicle_types>,
    @InjectRepository(vehicle_models)
    private vehicleModelsRepository: Repository<vehicle_models>,
    @InjectRepository(vehicle_years)
    private vehicleYearsRepository: Repository<vehicle_years>,
    @InjectRepository(pricelist)
    private pricelistRepository: Repository<pricelist>,
  ) {}

async getAll(page: number = 1, limit: number = 10): Promise<any> {
    const [data, total] = await this.pricelistRepository.findAndCount({
      relations: ['id_model', 'id_model.id_type', 'id_model.id_type.id_brand', 'id_year'],
      take: limit,
      skip: (page - 1) * limit,
    });
  
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
  
    const groupedData = {};
    data.forEach((pricelist) => {
      const year = pricelist.id_year.year;
      if (!groupedData[year]) {
        groupedData[year] = [];
      }
  
      groupedData[year].push({
        price: pricelist.price,
        modelName: pricelist.id_model.name,
        typeName: pricelist.id_model.id_type.name,
        brandName: pricelist.id_model.id_type.id_brand.name,
      });
    });
  
    const response = {
      success: true,
      total,
      previous: page > 1 ? page - 1 : null,
      next: nextPage,
      data: groupedData,
    };

    if (Object.keys(groupedData).length === 0) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }
  
    return response;
  }

  async getYear(page: number = 1, limit: number = 10, years: string[]): Promise<any> {
    const queryOptions = {
      relations: ['id_model', 'id_model.id_type', 'id_model.id_type.id_brand', 'id_year'],
      take: limit,
      skip: (page - 1) * limit,
    };

    if (years.length > 0) {
      queryOptions['where'] = years.map((year) => ({
        id_year: {
          year: year
        },
      }));
    }

    const [data, total] = await this.pricelistRepository.findAndCount(queryOptions);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;

    const groupedData = {};
    data.forEach((pricelist) => {
      const year = pricelist.id_year.year;
      if (!groupedData[year]) {
        groupedData[year] = [];
      }

      groupedData[year].push({
        price: pricelist.price,
        modelName: pricelist.id_model.name,
        typeName: pricelist.id_model.id_type.name,
        brandName: pricelist.id_model.id_type.id_brand.name,
      });
    });

    const response = {
      success: true,
      total,
      previous: page > 1 ? page - 1 : null,
      next: nextPage,
      data: groupedData,
    };

    if (Object.keys(groupedData).length === 0) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }

    return response;
  }
}
