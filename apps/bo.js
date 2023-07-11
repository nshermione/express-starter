import { Application } from "../src/core/App.js";
import { BOModule } from "../src/modules/bo/BOModule.js";
import { CommonModule } from "../src/modules/common/CommonModule.js";


const app = new Application();

app.start([
  new CommonModule(),
  new BOModule()
]);