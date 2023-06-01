import { PlugAndPlay } from "./plugin.mjs";
import { System } from "./system.mjs";

export class Module extends PlugAndPlay {
  constructor() {
    super();
  }

  setup() {
    this.system = new System(); 
  }
}

