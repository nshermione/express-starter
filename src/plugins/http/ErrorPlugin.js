import httpStatus from "http-status";
import { HttpError } from "../../core/Error.js";
import { HttpServerPlugin } from "../../core/Plugin.js";
import { CONFIG } from "../../core/Config.js";

export class ErrorPlugin extends HttpServerPlugin {
  async setup(httpServer) {
    super.setup(httpServer);
    httpServer.app.use((req, res, next) => {
      next(new HttpError('Not found', httpStatus.NOT_FOUND));
    }) 
    httpServer.app.use(this.catchError.bind(this));
  }

  catchError(err, req, res, next) {
    if (!(err instanceof HttpError)) {
      const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
      const message = err.message || httpStatus[statusCode];
      err = new HttpError(message, statusCode, false, err.stack);
    }

    let { statusCode, message } = err;
    if (CONFIG.ENVIRONMENT === 'production' && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
      code: statusCode,
      message,
      ...(CONFIG.ENVIRONMENT === 'development' && { stack: err.stack }),
    };

    if (err.statusCode === httpStatus.NOT_FOUND) {
      this.logger.error('NOT FOUND: ' + req.url);
    } else {
      this.logger.error(req.url, err);
    }

    res.status(statusCode).send(response);
  }
}