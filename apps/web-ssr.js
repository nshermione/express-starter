import { Application } from "../src/core/App.js";
import { CommonModule } from "../src/modules/common/CommonModule.js";
import { WebSSRModule } from "../src/modules/web-ssr/WebSSRModule.js";


const app = new Application();

app.start([
  new CommonModule(),
  new WebSSRModule() 
]);