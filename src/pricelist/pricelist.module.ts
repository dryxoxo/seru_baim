import { Module } from '@nestjs/common';
import { PricelistController } from './pricelist.controller';
import { PricelistService } from './pricelist.service';
import { pricelist } from './entity/pricelist.entity';


@Module({
  controllers: [PricelistController],
  providers: [PricelistService],
})
export class PricelistModule {}
