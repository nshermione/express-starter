import { CONFIG } from "../../core/config.mjs";
import { Module } from "../../core/module.mjs";

export class CommonModule extends Module {
  async setup() {
    super.setup();
    await this.system.startDatabases(CONFIG.DB);
  }
}