import { scheduleJob } from "node-schedule";
import { Module } from "../../core/Module.mjs";
import { CronPlugin } from "../../plugins/module/CronPlugin.mjs";
import { FileUtils } from "../../core/Utils.mjs";

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