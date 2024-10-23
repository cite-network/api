import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

type SuccessResponse<T> = {
  data: T;
  error: null;
};

type ErrorResponse = {
  data: null;
  error: {
    message: string;
    error: string;
    statusCode: number;
  };
};

type Response<T> = SuccessResponse<T> | ErrorResponse;

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data, // Success case: data is returned
        error: null, // No error in success case
      })),
    );
  }
}
