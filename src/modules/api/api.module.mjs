import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";

export class ApiModule extends Module {
  async setup() {
    super.setup(); 
    await this.system.startHttpServer(CONFIG.API.HTTP_SERVER);
  }
}