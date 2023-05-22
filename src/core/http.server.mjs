import express from 'express';
import http from 'http';
import { Logger } from './logger.mjs';

export class HttpServer {
  constructor(serverConfig) {
    this.logger = Logger.get(HttpServer.name);
    const app = express();
    const httpServer = http.createServer(app); 
    let port = serverConfig.PORT || 3000;
    httpServer.listen(port, () => {
      this.logger.info(`***** Listening to socket port [${port}] - http://localhost:${port} *****`);
    });
  }
}