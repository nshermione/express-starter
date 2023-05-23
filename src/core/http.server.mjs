import express from 'express';
import http from 'http';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { CONFIG } from './config.mjs';
import { Logger } from './logger.mjs';
import path from 'path';
import { HTTP_METHOD, HTTP_TYPE } from './constant.mjs';
import { Utils } from './utils.mjs';

export class HttpServer {
  constructor(serverConfig) {
    this.serverConfig = serverConfig;
  }
}

export class ExpressServer extends HttpServer {
  constructor(serverConfig) {
    super(serverConfig);
    this.logger = Logger.get(ExpressServer.name);
    this.app = express();
    this.http = http.createServer(this.app);

    if (CONFIG.ENVIRONMENT !== 'DEVELOPMENT') {
      this.app.use(helmet({
        contentSecurityPolicy: false,
      }));
    }

    this.app.use(mongoSanitize());
    this.app.use(compression());
    this.app.use(cors());
    this.app.options('*', cors());
  }
  start() {
    let port = this.serverConfig.PORT || 3000;
    this.http.listen(port, () => {
      this.logger.info(`***** Listening to socket port [${port}] - http://localhost:${port} *****`);
    });
  }
  addPublicPath(publicPath) {
    this.app.use(express.static(publicPath));
  }
  addRoutes(baseUrl, routes) {
    const router = express.Router();
    const routeFunc = {
      [HTTP_METHOD.GET]: 'get',
      [HTTP_METHOD.POST]: 'post'
    }
    for (const route of routes) {
      router[routeFunc[route.method || HTTP_METHOD.POST]](Utils.joinUrl(baseUrl, route.path), ...route.handlers);
    }
    this.app.use(router);
  }

  addControllers(controllers, baseUrl = '') {
    for (const controller of controllers) {
      const instance = new controller();
      this.addRoutes(baseUrl, instance.getRoutes());
    }
  }
}
