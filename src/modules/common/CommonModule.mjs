import { CONFIG } from "../../core/Config.mjs";
import { Database } from "../../core/Database.mjs";
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
    const db = new Database();
    await db.startDatabases(CONFIG.DB);
  }
}