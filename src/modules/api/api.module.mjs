import path from 'path';
import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";
import { Utils } from '../../core/utils.mjs';
import { JwtGuard } from './guards/jwt.guard.mjs';
import UserController from './pages/user.controller.mjs';

const ApiModuleConfig = {
  public: './public',
  baseUrl: '/api',
  controller: './controllers',
  controllers: [
    UserController
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
    
    httpServer.addControllerFolder({
      folder: path.resolve(Utils.dirname(import.meta.url), ApiModuleConfig.controller), 
      baseUrl: ApiModuleConfig.baseUrl,
      preRequests: ApiModuleConfig.guards
    });
    httpServer.start();
  }
}