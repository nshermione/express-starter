import { Module } from "../../core/Module.js";
import { FileUtils } from "../../core/Utils.js";
import { CONFIG } from '../../core/Config.js';
import SPAController from './SPAController.js';
import { HttpServer } from '../../core/HttpServer.js';
import { SPAPlugin } from "../../plugins/http/SPAPlugin.js";

export class SPAModule extends Module {
  async setup() {
    super.setup();
    const httpServer = new HttpServer(CONFIG.HTTP_SERVER);

    await httpServer.use(
      new SPAPlugin({
        root: FileUtils.resolvePath({ meta: import.meta, path: './' }), //'src/modules/spa',
        manifest: './dist/manifest.json',
        dist: './dist',
        assetFolder: './public' 
      })
    );

    httpServer.addControllers({
      controllers: [
        SPAController
      ],
    });


    httpServer.start();
  }
}