import { Application } from "../src/core/App.mjs";
import { CommonModule } from "../src/modules/common/CommonModule.mjs";
import { CronModule } from "../src/modules/cron/CronModule.mjs";

const app = new Application();

app.start([
  CommonModule,
  CronModule
]);