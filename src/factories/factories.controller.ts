import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { FactoryCreateDto } from './dto/factory-create.dto';
import { Factory } from './entities/factory.entity';
import { FactoriesService } from './factories.service';

@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) {}

  @Post('factory-create')
  async create(@Body() factoryData: FactoryCreateDto): Promise<Factory> {
    try {
      return await this.factoriesService.create(factoryData);
    } catch (error) {
      console.error('Error creating factory:', error);
      throw new HttpException(
        'Failed to create factory',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('factory-delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.factoriesService.delete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
