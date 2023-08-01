import path from 'path';
import { Module } from "../../core/Module.js";
import { FileUtils } from "../../core/Utils.js";
import { CONFIG } from '../../core/Config.js';
import WebSSRController from './controllers/WebSSRController.js';
import { HttpServer } from '../../core/HttpServer.js';
import { SPAPlugin } from '../../plugins/http/SPAPlugin.js';
import { ControllerPlugin } from '../../plugins/http/ControllerPlugin.js';
import { ErrorPlugin } from '../../plugins/http/ErrorPlugin.js';

export class WebSSRModule extends Module {
  async setup() {
    super.setup();
    const httpServer = new HttpServer(CONFIG.HTTP_SERVER);
    await httpServer.use(
      new SPAPlugin({
        root: FileUtils.resolvePath({ meta: import.meta, path: './' }), //'src/modules/spa',
        manifest: './dist/manifest.json',
        dist: './dist',
        assetFolder: './public',
        isSSR: true
      }),
      new ControllerPlugin({
        baseUrl: '',
        folder: FileUtils.resolvePath({ meta: import.meta, path: './controllers' })
      }),
      new ErrorPlugin()
    );
    
    httpServer.start();
  }
}