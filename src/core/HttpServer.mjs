import fs from 'fs';
import express from 'express';
import http from 'http';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { CONFIG } from './Config.mjs';
import path from 'path';
import { HTTP_METHOD } from './Constant.mjs';
import { FileUtils } from './Utils.mjs';
import { PlugAndPlay } from './Plugin.mjs';

export class HttpServer extends PlugAndPlay {
  constructor(serverConfig) {
    super();
    this.serverConfig = serverConfig;
    this.app = express();
    this.http = http.createServer(this.app);
    this.controllers = [];

    if (CONFIG.ENVIRONMENT !== 'development') {
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
      this.logger.info(`Listening to socket port [${port}] - http://localhost:${port}`);
    });
  }
  addPublicPath(publicPath) {
    this.app.use(express.static(publicPath));
  }
  addRoutes({ baseUrl = '', routes = [], preRequests = [], postRequests = [], controller }) {
    const router = express.Router();
    const routeFunc = {
      [HTTP_METHOD.GET]: 'get',
      [HTTP_METHOD.POST]: 'post'
    }

    const pluginPreRequest = this.plugins.filter(item => item.preRequest).map(item => item.preRequest);
    const pluginPostRequest = this.plugins.filter(item => item.postRequest).map(item => item.postRequest);

    for (const route of routes) {
      router[routeFunc[route.method || HTTP_METHOD.POST]](
        FileUtils.joinUrl(baseUrl, route.path), 
        ...pluginPreRequest, 
        ...preRequests, 
        ...route.handlers.map(item => item.bind(controller)), 
        ...pluginPostRequest, 
        ...postRequests
      );
    }
    this.app.use(router);
  }

  addControllers({ controllers = [], baseUrl = '', preRequests = [], postRequests = [] }) {
    let result = [];
    for (const controller of controllers) {
      const instance = new controller();
      this.addRoutes({
        baseUrl,
        routes: instance.getRoutes(),
        preRequests,
        controller: instance,
        postRequests
      });
      result.push(instance);
      this.controllers.push(instance);
    }
    return result;
  }

  getControllers() {
    return this.controllers;
  }
}
