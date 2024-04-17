import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from './entities/product.entity';
import { PaginationResponse } from 'src/common/interfaces/pagination.interface';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAllPaginated: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('getAll', () => {
    it('should return paginated products', async () => {
      const result: PaginationResponse<Product> = {
        items: [],
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      };
      jest
        .spyOn(service, 'findAllPaginated')
        .mockImplementation(async () => result);

      expect(await controller.getAll(1, 10)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const productDto: ProductCreateDto = {
        name: 'New Product',
        price: 100,
        description: 'Description',
        factoryId: 1,
      };
      const product: Product = {
        ...productDto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockImplementation(async () => product);

      expect(await controller.create(productDto)).toBe(product);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const productId = 1;
      jest.spyOn(service, 'delete').mockImplementation(async () => undefined);

      await expect(controller.remove(productId)).resolves.toBeUndefined();
    });
  });
});
