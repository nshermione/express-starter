import { Application } from "../src/core/App.js";
import { CommonModule } from "../src/modules/common/CommonModule.js";
import { SPAModule } from "../src/modules/spa/SPAModule.js";


const app = new Application();

app.start([
  CommonModule,
  SPAModule 
]);