import { PlugAndPlay } from "./Plugin.mjs";
import { System } from "./System.mjs";

export class Module extends PlugAndPlay {
  constructor() {
    super();
  }

  setup() {
    this.system = new System(); 
  }
}

