import { CONFIG } from "../../core/Config.mjs";
import { Module } from "../../core/Module.mjs";
import { FileUtils } from '../../core/Utils.mjs';
import { ErrorPlugin } from '../../plugins/http/ErrorPlugin.mjs';
import { SwaggerPlugin } from '../../plugins/swagger/SwaggerPlugin.mjs';
import { HttpServer } from '../../core/HttpServer.mjs';
import { ControllerPlugin } from '../../plugins/http/ControllerPlugin.mjs';
import { HttpLocalePlugin as LocalePlugin } from '../../plugins/http/LocalePlugin.mjs';

export class ApiModule extends Module {
  async setup() {
    super.setup();

    const httpServer = await new HttpServer(CONFIG.HTTP_SERVER);

    await httpServer.use(
      new LocalePlugin({
        folder: FileUtils.resolveFilePath({ meta: import.meta, filePath: './locales' })
      }),
      new ControllerPlugin({
        baseUrl: '',
        folder: FileUtils.resolveFilePath({ meta: import.meta, filePath: './controllers' })
      }),
      new SwaggerPlugin({
        baseUrl: '/docs',
        swaggerJson: FileUtils.readJsonFile({ meta: import.meta, filePath: './docs/swagger.json' })
      }),
      new ErrorPlugin(), // Use at the last position to catch error
    );

    // TODO: refresh token, access token
    // TODO: mysql database

    httpServer.start();
  }
}