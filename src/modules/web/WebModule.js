import path from 'path';
import { Module } from "../../core/Module.js";
import { FileUtils } from "../../core/Utils.js";
import { CONFIG } from '../../core/Config.js';
import WebPageController from './WebPageController.js';
import { HttpServer } from '../../core/HttpServer.js';

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