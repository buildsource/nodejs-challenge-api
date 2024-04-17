export interface PaginationResponse<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Pagination<T> {
  items: T[];
  totalItems: number;
}
