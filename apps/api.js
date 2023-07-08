/**
 * Config file is .env.api for production, .env.api.local for development
 * This app is API only purpose, do not use to render anything
 */

import { Application } from "../src/core/App.js";
import { ApiModule } from "../src/modules/api/ApiModule.js";
import { CommonModule } from "../src/modules/common/CommonModule.js";


const app = new Application();

app.start([
  CommonModule,
  ApiModule
]);