import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from './dto/product-create.dto';
import { ProductsService } from './products.service';
import { AppService } from 'src/app.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private appService: AppService,
  ) {}

  @Get('product-get-all')
  async getAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const { items, totalItems } = await this.productService.findAllPaginated(
        page,
        pageSize,
      );

      return this.appService.getPaginationResponse(
        items,
        page,
        pageSize,
        totalItems,
      );
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new HttpException(
        'Failed to fetch products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('product-create')
  async create(@Body() productData: CreateProductDto): Promise<Product> {
    try {
      return await this.productService.create(productData);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('product-delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.productService.delete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
