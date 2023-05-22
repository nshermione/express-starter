import { System } from "./core/system.mjs";

export const AppContext = {
  system: null
}

export class Application {
  init() {
    this.system = new System();
  }
}