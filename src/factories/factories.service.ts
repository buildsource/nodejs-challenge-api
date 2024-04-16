import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';
import { Repository } from 'typeorm';
import { FactoryCreateDto } from './dto/factory-create.dto';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private factoriesService: Repository<Factory>,
  ) {}

  async create(factoryCreateDto: FactoryCreateDto) {
    try {
      const product = this.factoriesService.create(factoryCreateDto);
      return this.factoriesService.save(product);
    } catch (error) {
      throw new HttpException(
        `Failed to create factory: ${error.message}`,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.factoriesService.delete(id);
    } catch (error) {
      throw new HttpException(
        `Failed to delete factory: ${error.message}`,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
