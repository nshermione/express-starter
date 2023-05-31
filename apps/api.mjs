/**
 * Config file is .env.api for production, .env.api.local for development
 * This app is API only purpose, do not use to render anything
 */

import { Application } from "../src/core/app.mjs";
import { ApiModule } from "../src/modules/api/api.module.mjs";
import { CommonModule } from "../src/modules/common/common.module.mjs";


const app = new Application();

app.start([
  CommonModule,
  ApiModule
]);