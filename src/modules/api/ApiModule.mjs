import { CONFIG } from "../../core/Config.mjs";
import { Module } from "../../core/Module.mjs";
import { FileUtils } from '../../core/Utils.mjs';
import { HttpErrorPlugin } from '../../plugins/http/HttpErrorPlugin.mjs';
import { SwaggerPlugin } from '../../plugins/swagger/SwaggerPlugin.mjs';
import { HttpServer } from '../../core/HttpServer.mjs';
import { ControllerFolderPlugin } from '../../plugins/http/ControllerFolderPlugin.mjs';
import { HttpLocalePlugin } from '../../plugins/http/HttpLocalePlugin.mjs';

export class ApiModule extends Module {
  async setup() {
    super.setup();

    const httpServer = await new HttpServer(CONFIG.HTTP_SERVER);

    await httpServer.use(
      new HttpLocalePlugin({
        folder: FileUtils.resolveFilePath({ meta: import.meta, filePath: './locales' })
      }),
      new ControllerFolderPlugin({
        baseUrl: '',
        folder: FileUtils.resolveFilePath({ meta: import.meta, filePath: './controllers' })
      }),
      new SwaggerPlugin({
        baseUrl: '/docs',
        swaggerJson: FileUtils.readJsonFile({ meta: import.meta, filePath: './docs/swagger.json' })
      }),
      new HttpErrorPlugin(), // Use at the last position to catch error
    );

    // TODO: refresh token, access token
    // TODO: mysql database

    httpServer.start();
  }
}