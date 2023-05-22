import express from 'express';
import http from 'http';
import { Logger } from './logger.mjs';

export class Server {
  constructor() {
    this.logger = Logger.get(Server.name);
    const app = express();
    const httpServer = http.createServer(app); 
    let port = 3000;
    httpServer.listen(port, () => {
      this.logger.info(`***** Listening to socket port [${port}] - http://localhost:${port} *****`);
    });
  }
}