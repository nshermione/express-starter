import path from 'path';
import fs from 'fs';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { Utils } from '../../core/utils.mjs';

export class ApiModule extends Module {
  async setup() {
    super.setup();
    const httpServer = await this.system.createHttpServer(CONFIG.API.HTTP_SERVER);
    httpServer.addSwaggerUI(
      '/docs', 
      JSON.parse(fs.readFileSync(path.join(Utils.dirname(import.meta.url), './docs/swagger.json')).toString())
    ); 
    httpServer.addControllerFolder({
      folder: path.join(Utils.dirname(import.meta.url), './controllers')
    })
    // TODO: refresh token, access token
    // TODO: mysql database

    httpServer.start();
  }
}