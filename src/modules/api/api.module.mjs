import path from 'path';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { Utils } from '../../core/utils.mjs';

const ApiModuleConfig = {
  public: './public',
  baseUrl: '/api',
  controller: './controllers'
  // controllers: [
  //   UserController
  // ]
};

export class ApiModule extends Module {
  async setup() {
    super.setup();
    const httpServer = await this.system.createHttpServer(CONFIG.API.HTTP_SERVER);
    httpServer.addPublicPath(path.join(Utils.dirname(import.meta.url), ApiModuleConfig.public));
    // httpServer.addControllers(ApiModuleConfig.controllers, ApiModuleConfig.baseUrl);
    httpServer.addControllerFolder(
      path.join(Utils.dirname(import.meta.url), ApiModuleConfig.controller), 
      ApiModuleConfig.baseUrl
    );
    httpServer.start();
  }
}