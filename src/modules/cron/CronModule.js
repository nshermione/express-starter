import { scheduleJob } from "node-schedule";
import { Module } from "../../core/Module.js";
import { CronPlugin } from "../../plugins/module/CronPlugin.js";
import { FileUtils } from "../../core/Utils.js";

export class CronModule extends Module {
  async setup() {
    super.setup();

    this.use(
      new CronPlugin({
        folder: FileUtils.resolvePath({ meta: import.meta, path: './jobs'})
      })
    );
    
  }
}