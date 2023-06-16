import path from 'path';
import { Module } from "../../core/Module.mjs";
import { FileUtils } from "../../core/Utils.mjs";
import { CONFIG } from '../../core/Config.mjs';
import WebPageController from './WebPageController.mjs';
import { HttpServer } from '../../core/HttpServer.mjs';

export class WebModule extends Module {
  async setup() {
    super.setup();
    const httpServer = new HttpServer(CONFIG.HTTP_SERVER);
    httpServer.addPublicPath(path.join(FileUtils.dirname(import.meta.url), './public'));
    httpServer.addControllers({
      controllers: [
        WebPageController
      ],
    })
    
    httpServer.start();
  }
}