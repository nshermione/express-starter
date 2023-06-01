import path from 'path';
import { Module } from "../../core/Module.mjs";
import { FileUtils } from "../../core/Utils.mjs";
import { CONFIG } from '../../core/Config.mjs';
import PageController from './PageController.mjs';

export class WebModule extends Module {
  async setup() {
    super.setup();
    const httpServer = await this.system.createHttpServer(CONFIG.WEB.HTTP_SERVER);
    httpServer.addPublicPath(path.join(FileUtils.dirname(import.meta.url), './public'));
    httpServer.addControllers({
      controllers: [
        PageController
      ],
    }) 
    httpServer.start();
  }
}