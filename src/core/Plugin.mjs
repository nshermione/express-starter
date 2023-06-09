import { Logger } from "./Logger.mjs";

export class PlugAndPlay {
  constructor() {
    this.plugins = [];
    this.logger = Logger.get(this.constructor.name);
  }

  async use(...plugins) {
    for (const plugin of plugins) {
      try {
        await plugin.setup(this);
        this.plugins.push(plugin); 
      } catch (err) {
        this.logger.error(`Can not setup the plugin: ${plugin.constructor.name}. `, err);
      }
    }
  } 
}

export class ModulePlugin {
  async setup(module) {
    this.module = module;
  }
}

export class HttpServerPlugin {
  constructor() {
    this.logger = Logger.get(this.constructor.name);
  }
  
  async setup(httpServer) {
    this.httpServer = httpServer;
  }

  async preRequest(req, res, next) {

  }

  async postRequest(req, res, next) {

  }
}