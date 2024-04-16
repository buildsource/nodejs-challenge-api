import { Injectable } from '@nestjs/common';
import { PaginationResponse } from './interfaces/pagination.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPaginationResponse<T>(
    items: T[],
    currentPage: number,
    pageSize: number,
    totalItems: number,
  ): PaginationResponse<T> {
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      items,
      currentPage,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}
