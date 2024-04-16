import { PaginationResponse } from '../interfaces/pagination.interface';

export class PaginationUtil {
  static getPaginationResponse<T>(
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
