import { CONFIG } from "./config.mjs";
import { System } from "./system.mjs";

export class Module {
  setup() {
    this.system = new System(); 
  }
}

