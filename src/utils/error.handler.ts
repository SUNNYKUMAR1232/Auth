
import { Response } from 'express';
import createHttpError from 'http-errors';

type StatusCode = HttpStatus;
type Message = HttpStatusMessage;

interface IResponse{
      sucess: boolean;
      statusCode: StatusCode;
      message: Message;
      data?: unknown;
}
export function errorHandler(
  err: createHttpError.HttpError,
  res: Response,
): Response<IResponse> {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  const errorResponse: IResponse = {
    sucess: false,
    statusCode: statusCode as StatusCode,
    message: message as Message
  };
  return res.status(statusCode).json(errorResponse);
}
export function sucessHandler(
      res: Response,
      data: unknown,
      statusCode: StatusCode ,
      message: Message 
      ): Response<IResponse> {
      const successResponse: IResponse = {
      sucess: true,
      statusCode: statusCode,
      message: message,
      data: data
      };
      return res.status(statusCode).json(successResponse);
      }



export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}

export enum HttpStatusMessage {
    OK = "OK",
    CREATED = "Created",
    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    CONFLICT = "Conflict",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    SERVICE_UNAVAILABLE = "Service Unavailable"
}
