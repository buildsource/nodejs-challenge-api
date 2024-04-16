import { Product } from '../entities/product.entity';

export interface PaginatedProducts {
  items: Product[];
  totalItems: number;
}
