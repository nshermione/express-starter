import path from 'path';
import fs from 'fs';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { FileUtils } from '../../core/utils.mjs';
import { HttpErrorPlugin } from '../../plugins/http/HttpErrorPlugin.mjs';
import { SwaggerPlugin } from '../../plugins/swagger/SwaggerPlugin.mjs';

export class ApiModule extends Module {
  async setup() {
    super.setup();

    const httpServer = await this.system.createHttpServer(CONFIG.HTTP_SERVER);

    await httpServer.addControllerFolder({
      baseUrl: '',
      folder: FileUtils.resolveFilePath({ meta: import.meta, filePath: './controllers' })
    })

    await httpServer.use(
      new HttpErrorPlugin(),
      new SwaggerPlugin({
        baseUrl: '/docs',
        swaggerJson: FileUtils.readJsonFile({ meta: import.meta, filePath: './docs/swagger.json' })
      })
    );

    // TODO: error handling, locales
    // TODO: refresh token, access token
    // TODO: mysql database

    httpServer.start();
  }
}