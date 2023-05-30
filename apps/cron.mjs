import { Application } from "../src/core/app.mjs";
import { CommonModule } from "../src/modules/common/common.module.mjs";
import { CronModule } from "../src/modules/cron/cron.module.mjs";

const app = new Application();

app.start([
  CommonModule,
  CronModule
]);