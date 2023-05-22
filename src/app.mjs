import { System } from "./core/system.mjs";

export const AppContext = {
  system: null
}

export class Application {
  async init() {
    this.system = new System();

    await this.system.startDatabases();
    await this.system.startServer();
  }
}