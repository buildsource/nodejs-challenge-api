import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../dto/response.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    console.log('Handling request...');

    const request = context.switchToHttp().getRequest();
    console.log(`Incoming Request: ${request.method} ${request.url}`);

    return next.handle().pipe(
      map((data) => {
        console.log('Processing response...');
        console.log(data);
        return new ApiResponse(true, data);
      }),
      catchError((error) => {
        console.log('Error occurred:', error.message);
        console.log('Error status:', error.status);
        const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          error.response || error.message || 'Internal server error';
        return throwError(() => new ApiResponse(false, null, status, message));
      }),
    );
  }
}
