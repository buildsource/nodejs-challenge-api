import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            count: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('create', () => {
    it('should successfully create a product', async () => {
      const productDto = new ProductCreateDto();
      const product = new Product();
      jest.spyOn(repository, 'create').mockReturnValue(product);
      jest.spyOn(repository, 'save').mockResolvedValue(product);

      expect(await service.create(productDto)).toEqual(product);
    });
  });

  it('should throw a validation exception if the product data is invalid', async () => {
    const productDto = new ProductCreateDto();

    const errors = await validate(productDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toHaveLength(4);

    errors.forEach((error) => {
      expect(error.constraints).toBeDefined();
    });

    const nameError = errors.find((e) => e.property === 'name');
    expect(nameError.constraints['isNotEmpty']).toBeDefined();

    const descriptionError = errors.find((e) => e.property === 'description');
    expect(descriptionError.constraints['isNotEmpty']).toBeDefined();

    const priceError = errors.find((e) => e.property === 'price');
    expect(priceError.constraints['isNumber']).toBeDefined();
    expect(priceError.constraints['min']).toBeDefined();

    const factoryIdError = errors.find((e) => e.property === 'factoryId');
    expect(factoryIdError.constraints['isInt']).toBeDefined();
    expect(factoryIdError.constraints['isNotEmpty']).toBeDefined();

    jest.spyOn(repository, 'create').mockReturnValue(productDto as any);
    jest.spyOn(repository, 'save').mockImplementation(() => {
      throw new Error('This should not be called due to validation errors');
    });

    await expect(service.create(productDto as any)).rejects.toThrow(
      'This should not be called due to validation errors',
    );
  });

  describe('delete', () => {
    it('should throw an error if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.delete(1)).rejects.toThrow(
        new NotFoundException(
          'Failed to delete product: Product with ID 1 not found.',
        ),
      );
    });
  });

  describe('delete', () => {
    it('should delete a product if found', async () => {
      const product = new Product();

      jest.spyOn(repository, 'findOne').mockResolvedValue(product);
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: {},
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);

      await expect(service.delete(1)).resolves.toBeUndefined();

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('findAllPaginated', () => {
    it('should return grouped paginated products', async () => {
      const products: Product[] = Array.from(
        { length: 4 },
        () => new Product(),
      );

      jest.spyOn(repository, 'find').mockResolvedValue(products);
      jest.spyOn(repository, 'count').mockResolvedValue(products.length);

      const result = await service.findAllPaginated(1, 3);
      expect(result.items).toHaveLength(products.length);
      expect(result.totalItems).toBe(products.length);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error finding products';
      jest.spyOn(repository, 'find').mockRejectedValue(new Error(errorMessage));

      await expect(service.findAllPaginated(1, 3)).rejects.toThrow(
        new HttpException(
          `Failed to listing product: ${errorMessage}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
