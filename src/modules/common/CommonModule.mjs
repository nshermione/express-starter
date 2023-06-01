import { CONFIG } from "../../core/Config.mjs";
import { Module } from "../../core/Module.mjs";

/**
 * Module for shared components of project:
 * - Models
 * - Constants
 * - Calculators
 * - Formatters
 */
export class CommonModule extends Module {
  async setup() {
    super.setup();
    await this.system.startDatabases(CONFIG.DB);
  }
}