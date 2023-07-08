import { CONFIG } from "../../core/Config.js";
import { Module } from "../../core/Module.js";
import { FileUtils } from '../../core/Utils.js';
import { ErrorPlugin } from '../../plugins/http/ErrorPlugin.js';
import { SwaggerPlugin } from '../../plugins/swagger/SwaggerPlugin.js';
import { HttpServer } from '../../core/HttpServer.js';
import { ControllerPlugin } from '../../plugins/http/ControllerPlugin.js';
import { HttpLocalePlugin as LocalePlugin } from '../../plugins/http/LocalePlugin.js';

export class ApiModule extends Module {
  async setup() {
    super.setup();

    const httpServer = await new HttpServer(CONFIG.HTTP_SERVER);

    await httpServer.use(
      new LocalePlugin({
        folder: FileUtils.resolvePath({ meta: import.meta, path: './locales' })
      }),
      new ControllerPlugin({
        baseUrl: '',
        folder: FileUtils.resolvePath({ meta: import.meta, path: './controllers' })
      }),
      new SwaggerPlugin({
        baseUrl: '/docs',
        swaggerJson: FileUtils.readJsonFile({ meta: import.meta, filePath: './docs/swagger.json' })
      }),
      new ErrorPlugin(), // Use at the last position to catch error
    );

    // TODO: refresh token, access token
    // TODO: mysql database
    // TODO: email

    httpServer.start();
  }
}