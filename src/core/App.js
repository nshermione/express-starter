import { CONFIG } from "./Config.js";
import { Logger } from "./Logger.js";

export class Application {
  async start(modules) {
    this.logger = Logger.get(this.constructor.name);
    this.logger.info(`Envinronment: ${CONFIG.ENVIRONMENT}`);
    for (const module of modules) {
      await module.setup();
      this.logger.info(`Loaded module: ${module.constructor.name}`);
    }
  }
}