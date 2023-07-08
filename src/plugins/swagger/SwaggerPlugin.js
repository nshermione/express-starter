import { HttpServer } from "../../core/HttpServer.js";
import { HttpServerPlugin } from "../../core/Plugin.js";
import { Swagger } from "./Swagger.js";

export class SwaggerPlugin extends HttpServerPlugin {
  constructor({ baseUrl, swaggerJson  }) {
    super();
    this.baseUrl = baseUrl;
    this.swaggerJson = swaggerJson;
  }

  async setup(httpServer) {
    const controllers = httpServer.getControllers();
    this.swagger = new Swagger({ 
      httpServer, 
      baseUrl: this.baseUrl, 
      swaggerJson: this.swaggerJson, 
      controllers
    });
    this.logger.info(`Docs at ${this.baseUrl}`)
  }
}