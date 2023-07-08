import { CONFIG } from "../../core/Config.js";
import { Database } from "../../core/Database.js";
import { Module } from "../../core/Module.js";

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