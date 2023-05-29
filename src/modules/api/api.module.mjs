import path from 'path';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { Utils } from '../../core/utils.mjs';
import { JwtGuard } from './guards/jwt.guard.mjs';
import HomeController from './pages/home/home.controller.mjs';

const ApiModuleConfig = {
  public: './public',
  baseUrl: '',
  controller: './components',
  pageControllers: [
    HomeController
  ],
  guards: [
    JwtGuard.onRequest
  ]
};

export class ApiModule extends Module {
  async setup() {
    super.setup();
    const httpServer = await this.system.createHttpServer(CONFIG.API.HTTP_SERVER);
    httpServer.addPublicPath(path.join(Utils.dirname(import.meta.url), ApiModuleConfig.public));
    httpServer.addControllers({
      controllers: ApiModuleConfig.pageControllers,
    }) 
    httpServer.start();
  }
}