import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { PaginationUtil } from '../common/utils/pagination.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('product-get-all')
  @UseGuards(JwtAuthGuard)
  async getAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const { items, totalItems } = await this.productService.findAllPaginated(
        page,
        pageSize,
      );

      const data = PaginationUtil.getPaginationResponse(
        items,
        page,
        pageSize,
        totalItems,
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  @Post('product-create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() productData: ProductCreateDto): Promise<Product> {
    try {
      return await this.productService.create(productData);
    } catch (error) {
      throw error;
    }
  }

  @Delete('product-delete/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.productService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
