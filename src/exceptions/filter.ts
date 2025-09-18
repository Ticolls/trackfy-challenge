import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (this.isHttpExceptionResponse(exceptionResponse)) {
        message = exceptionResponse.message;
      } else {
        message = exceptionResponse as string;
      }
    } else {
      message = 'Erro interno no servidor';
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  private isHttpExceptionResponse(
    response: any,
  ): response is HttpExceptionResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'message' in response &&
      (typeof response.message === 'string' || Array.isArray(response.message))
    );
  }
}
