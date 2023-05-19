import { System } from "./core/system.mjs";

export class Application {
  init() {
    this.system = new System();
  }
}