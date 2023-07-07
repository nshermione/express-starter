import { Job } from "../../../plugins/module/CronPlugin.mjs";

export class HelloJob extends Job {

  process(info) {
    super.process(info);
    this.logger.info("Hello job run 1");
  }
}