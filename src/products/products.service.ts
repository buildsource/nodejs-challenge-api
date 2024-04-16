import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { Pagination } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: ProductCreateDto) {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<Pagination<Product>> {
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

      const productsGrouped: Product[] = plainObjectsArray.map((product) => {
        return JSON.parse(JSON.stringify(product));
      });

      return { items: productsGrouped, totalItems };
    } catch (error) {
      throw new HttpException(
        `Failed to listing product: ${error.message}`,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
  catch(error) {
    throw new HttpException(
      `Failed to delete product: ${error.message}`,
      error.status || HttpStatus.BAD_REQUEST,
    );
  }
}
