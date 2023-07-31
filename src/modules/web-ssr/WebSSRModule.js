import path from 'path';
import { Module } from "../../core/Module.js";
import { FileUtils } from "../../core/Utils.js";
import { CONFIG } from '../../core/Config.js';
import WebSSRController from './WebSSRController.js';
import { HttpServer } from '../../core/HttpServer.js';
import { SPAPlugin } from '../../plugins/http/SPAPlugin.js';

export class WebSSRModule extends Module {
  async setup() {
    super.setup();
    const httpServer = new HttpServer(CONFIG.HTTP_SERVER);
    httpServer.use(
      new SPAPlugin({
        root: FileUtils.resolvePath({ meta: import.meta, path: './' }), //'src/modules/spa',
        manifest: './dist/manifest.json',
        dist: './dist',
        assetFolder: './public',
        isSSR: true
      })
    );

    httpServer.addControllers({
      controllers: [
        WebSSRController
      ],
    })
    
    httpServer.start();
  }
}