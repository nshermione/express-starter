import { Application } from "./src/core/app.mjs";
import { ApiModule } from "./src/modules/api/api.module.mjs";
import { CommonModule } from "./src/modules/common/common.module.mjs";

const app = new Application();

app.start([
  CommonModule,
  ApiModule
]);