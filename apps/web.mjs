import { Application } from "../src/core/app.mjs";
import { CommonModule } from "../src/modules/common/CommonModule.mjs";
import { WebModule } from "../src/modules/web/WebModule.mjs";


const app = new Application();

app.start([
  CommonModule,
  WebModule 
]);