import { Application } from "../src/core/App.mjs";
import { CommonModule } from "../src/modules/common/CommonModule.mjs";
import { SPAModule } from "../src/modules/spa/SPAModule.mjs";


const app = new Application();

app.start([
  CommonModule,
  SPAModule 
]);