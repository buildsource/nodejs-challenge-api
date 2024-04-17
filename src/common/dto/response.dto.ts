export class ApiResponse<T> {
  status: boolean;
  statusCode?: number;
  message?: string;
  payload?: T;

  constructor(
    status: boolean,
    payload?: T,
    statusCode?: number,
    message?: string,
  ) {
    this.status = status;
    this.payload = payload;
    this.statusCode = statusCode;
    this.message = message;
  }
}
