import { Application } from "./src/core/app.mjs";
import { CommonModule } from "./src/modules/common/common.module.mjs";
import { WebModule } from "./src/modules/web/web.module.mjs";

const app = new Application();

app.start([
  CommonModule,
  WebModule 
]);