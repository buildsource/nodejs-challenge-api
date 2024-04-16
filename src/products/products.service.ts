import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product-create.dto';
import { PaginatedProducts } from './interfaces/products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<PaginatedProducts> {
    try {
      const products: Product[] = await this.productsRepository.find({
        take: limit,
        skip: (page - 1) * limit,
      });

      const totalItems = await this.productsRepository.count();

      const groupedProducts = products.reduce((acc, product) => {
        acc[product.factoryId] = acc[product.factoryId] || [];
        acc[product.factoryId].push(product);
        return acc;
      }, {});

      const plainObjectsArray = Object.values(groupedProducts).flat();

      console.log(plainObjectsArray);

      const productsGrouped: Product[] = plainObjectsArray.map((product) => {
        return JSON.parse(JSON.stringify(product));
      });

      console.log(productsGrouped);

      return { items: productsGrouped, totalItems };
    } catch (error) {
      console.error('Error listing product:', error);
      throw new Error('Failed to listing product');
    }
  }

  async delete(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
  catch(error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}
