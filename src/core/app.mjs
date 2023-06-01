import { CONFIG } from "./Config.mjs";
import { Logger } from "./Logger.mjs";

export class Application {
  async start(modules) {
    this.logger = Logger.get(Application.name);
    this.logger.info(CONFIG.ENVIRONMENT);
    for (const module of modules) {
      this.logger.info(module.name);
      await (new module()).setup();
    }
  }
}