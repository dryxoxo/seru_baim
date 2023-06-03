import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { vehicle_models } from 'src/vehicle-models/entity/vehicle-models.entity';
import { Repository } from 'typeorm';
import { pricelist } from '../pricelist/entity/pricelist.entity';
import { vehicle_brands } from 'src/vehicle-brands/entity/vehicle-brands.entity';
import { vehicle_types } from 'src/vehicle-types/entity/vehicle-types.entity';
import { vehicle_years } from 'src/vehicle-years/entity/vehicle-years.entity';
import { CreatePricelistDto } from './dto/create-createVehicle.dto';
import { Equal } from 'typeorm';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CreateVehicleService {
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

  async create(createPricelistDto: CreatePricelistDto, req: Request): Promise<any> {
    const { brandName, typeName, modelName, year, price } = createPricelistDto;
    if (req['user'].role !== 'admin') {
        throw new UnauthorizedException('Only admin can create pricelist');
      }
      
    let vehicleBrand = await this.vehicleBrandsRepository.findOne({
      where: { name: brandName },
    });
    if (!vehicleBrand) {
      vehicleBrand = new vehicle_brands();
      vehicleBrand.name = brandName;
      vehicleBrand = await this.vehicleBrandsRepository.save(vehicleBrand);
    }

    let vehicleType = await this.vehicleTypesRepository.findOne({
      where: { name: typeName, id_brand: Equal(vehicleBrand.id_brand) },
    });
    if (!vehicleType) {
      vehicleType = new vehicle_types();
      vehicleType.name = typeName;
      vehicleType.id_brand = vehicleBrand;
      vehicleType = await this.vehicleTypesRepository.save(vehicleType);
    }

    let vehicleModel = await this.vehicleModelsRepository.findOne({
      where: { name: modelName, id_type: Equal(vehicleType.id_type) },
    });
    if (!vehicleModel) {
      vehicleModel = new vehicle_models();
      vehicleModel.name = modelName;
      vehicleModel.id_type = vehicleType;
      vehicleModel = await this.vehicleModelsRepository.save(vehicleModel);
    }

    let vehicleYear = await this.vehicleYearsRepository.findOne({
      where: { year },
    });
    if (!vehicleYear) {
      vehicleYear = new vehicle_years();
      vehicleYear.year = year;
      vehicleYear = await this.vehicleYearsRepository.save(vehicleYear);
    }

    const newPricelist = new pricelist();
    newPricelist.price = price;
    newPricelist.id_year = vehicleYear;
    newPricelist.id_model = vehicleModel;

    return this.pricelistRepository.save(newPricelist);
  }

  async getAll(): Promise<any[]> {
    const pricelists = await this.pricelistRepository.find({
      relations: ['id_model', 'id_model.id_type', 'id_model.id_type.id_brand', 'id_year'],
    });
  
    return pricelists.map(pricelist => ({
      price: pricelist.price,
      year: pricelist.id_year.year,
      modelName: pricelist.id_model.name,
      typeName: pricelist.id_model.id_type.name,
      brandName: pricelist.id_model.id_type.id_brand.name,
    }));
  }
}

