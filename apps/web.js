import { Application } from "../src/core/App.js";
import { CommonModule } from "../src/modules/common/CommonModule.js";
import { WebModule } from "../src/modules/web/WebModule.js";


const app = new Application();

app.start([
  CommonModule,
  WebModule 
]);