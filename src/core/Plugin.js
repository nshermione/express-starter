import { Logger } from "./Logger.js";

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
        this.logger.info(`Loaded plugin: ${plugin.constructor.name}`);
      } catch (err) {
        this.logger.error(`Can not setup the plugin: ${plugin.constructor.name}.`, err);
      }
    }
  } 
}

export class ModulePlugin {
  constructor() {
    this.logger = Logger.get(this.constructor.name);
  }

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
    next();
  }

  async postRequest(req, res, next) {
    next();
  }
}