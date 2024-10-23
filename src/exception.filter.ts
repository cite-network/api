import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response as ExpressResponse } from "express";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      data: null, // Error case: no data
      error: {
        message: exceptionResponse.message || "An error occurred",
        error: exceptionResponse.error || exception.message,
        statusCode: status,
      },
    });
  }
}
