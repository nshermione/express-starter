import { HttpServer } from "../../core/HttpServer.mjs";
import { HttpServerPlugin } from "../../core/Plugin.mjs";
import { Swagger } from "./Swagger.mjs";

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
  }
}