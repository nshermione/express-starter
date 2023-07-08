import { Application } from "../src/core/App.js";
import { CommonModule } from "../src/modules/common/CommonModule.js";
import { CronModule } from "../src/modules/cron/CronModule.js";

const app = new Application();

app.start([
  CommonModule,
  CronModule
]);