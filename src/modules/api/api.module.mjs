import path from 'path';
import fs from 'fs';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { FileUtils } from '../../core/utils.mjs';

export class ApiModule extends Module {
  async setup() {
    super.setup();
    const httpServer = await this.system.createHttpServer(CONFIG.HTTP_SERVER);

    let controllers = await httpServer.addControllerFolder({
      folder: FileUtils.resolveFilePath({ meta: import.meta, filePath: './controllers' })
    })
    httpServer.addSwaggerUI({
      baseUrl: '/docs',
      swaggerJson: FileUtils.readJsonFile({ meta: import.meta, filePath: './docs/swagger.json' }),
      controllers
    });
    // TODO: refresh token, access token
    // TODO: mysql database

    httpServer.start();
  }
}