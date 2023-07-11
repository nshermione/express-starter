import { CONFIG } from "./Config.js";
import { Logger } from "./Logger.js";

export class Application {
  async start(modules) {
    this.logger = Logger.get(this.constructor.name);
    this.logger.info(`Envinronment: ${CONFIG.ENVIRONMENT}`);
    for (const module of modules) {
      this.logger.info(`Load module: ${module.name}`);
      await module.setup();
    }
  }
}