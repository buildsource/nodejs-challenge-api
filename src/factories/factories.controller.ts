import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FactoryCreateDto } from './dto/factory-create.dto';
import { Factory } from './entities/factory.entity';
import { FactoriesService } from './factories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) {}

  @Post('factory-create')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
