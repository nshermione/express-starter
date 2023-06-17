import { Module } from "../../core/Module.mjs";
import { FileUtils } from "../../core/Utils.mjs";
import { CONFIG } from '../../core/Config.mjs';
import SPAController from './SPAController.mjs';
import { HttpServer } from '../../core/HttpServer.mjs';
import { SPAPlugin } from '../../plugins/http/SPAPlugin.mjs';

export class SPAModule extends Module {
  async setup() {
    super.setup();
    const httpServer = new HttpServer(CONFIG.HTTP_SERVER);

    httpServer.addPublicPath(
      FileUtils.resolvePath({ meta: import.meta, path: './public' })
    );

    httpServer.use(
      new SPAPlugin({
        manifest: FileUtils.readJsonFile({ meta: import.meta, filePath: './dist/manifest.json' }),
        dist: FileUtils.resolvePath({ meta: import.meta, path: './dist' })
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