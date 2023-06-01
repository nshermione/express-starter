import { ExpressServer } from "../../core/http.server.mjs";
import { HttpServerPlugin } from "../../core/plugin.mjs";
import { ExpressSwagger } from "./Swagger.mjs";

export class SwaggerPlugin extends HttpServerPlugin {
  constructor({ baseUrl, swaggerJson  }) {
    super();
    this.baseUrl = baseUrl;
    this.swaggerJson = swaggerJson;
  }

  async setup(httpServer) {
    if (httpServer instanceof ExpressServer) {
      const controllers = httpServer.getControllers();
      this.swagger = new ExpressSwagger({ 
        httpServer, 
        baseUrl: this.baseUrl, 
        swaggerJson: this.swaggerJson, 
        controllers
      });
    }
  }
}