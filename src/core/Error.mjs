import httpStatus from "http-status";

export class HttpError extends Error {
  constructor(message, statusCode , isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
