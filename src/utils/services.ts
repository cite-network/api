import { BadRequestException, NotFoundException } from "@nestjs/common";

export enum ErrorCode {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNKNOWN = 500,
}

type SuccessResult<T> = {
  data: T;
  hasError: false;
  errorCode: null;
  errorMessage: null;
};
type ErrorResult = {
  data: null;
  hasError: true;
  errorCode: number;
  errorMessage: string;
};
type Result<T> = SuccessResult<T> | ErrorResult;

export function successResult<T>(data: any): Result<T> {
  return { data, hasError: false, errorCode: null, errorMessage: null };
}

export function errorResult<T>(
  errorCode: number,
  errorMessage: string,
): Result<T> {
  return { data: null, hasError: true, errorCode, errorMessage };
}

export function handleErrorResult(error: ErrorResult) {
  switch (error.errorCode) {
    case ErrorCode.NOT_FOUND:
      throw new NotFoundException(error.errorMessage);
    case ErrorCode.BAD_REQUEST:
      throw new BadRequestException(error.errorMessage);
    default:
      throw new Error(error.errorMessage);
  }
}
