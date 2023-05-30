import path from 'path';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { Utils } from '../../core/utils.mjs';

export class ApiModule extends Module {
  async setup() {
    super.setup();
    const httpServer = await this.system.createHttpServer(CONFIG.API.HTTP_SERVER);
    httpServer.addControllerFolder({
      folder: path.join(Utils.dirname(import.meta.url), './controllers')
    })
    httpServer.start();
  }
}