import express from 'express';
import { getAbsoluteFSPath, SwaggerUtils } from './swagger-ui-dist/index.js';
import { CONFIG } from './config.mjs';

export class ExpressSwagger {
  constructor({ httpServer, baseUrl = '/docs', swaggerJson, controllers = [] }) {
    let paths = this.getPathsFromControllers(controllers);
    httpServer.app.use(baseUrl, express.static(getAbsoluteFSPath()));
    httpServer.app.get(baseUrl + '/swagger.json', (req, res) => {
      if (paths) {
        // Override swagger.json "paths" field
        swaggerJson.paths = paths;
      }
      swaggerJson.host = CONFIG.SWAGGER.HOST || '';
       // Override swagger.json "definitions" field
      swaggerJson.definitions = {};
      res.send(swaggerJson)
    });
    httpServer.app.get(baseUrl, (req, res) => {
      let port = httpServer.serverConfig.PORT || 3000;
      res.send(SwaggerUtils.getIndexHtml({
        url: `http://localhost:${port}${baseUrl}/swagger.json`,
        deepLinking: true,
        layout: "StandaloneLayout"
      }))
    });
  }

  getPathsFromControllers(controllers) {
    let paths = {};
    for (let controller of controllers) {
      const routes = controller.getRoutes();
      for (const route of routes) {
        const path = this.parseRoute(route);
        paths = Object.assign(paths, path); 
      }
    }
    return paths;
  }

  parseParam(route, doc, parameterType = 'body') {
    let params = [];
    let method = route.method.toLowerCase();
    let routeParams = doc[parameterType];
    for (const name in routeParams) {
      const param = routeParams[name];
      let ext = {};
      if (param.type === "array") {
        ext.items = param.items;
        ext.collectionFormat = param.collectionFormat || "multi";
      }
      params.push(
        {
          name,
          in: parameterType,
          description: param.description || "",
          required: param.required || true,
          example: param.example,
          default: param.default,
          type: param.type || "string",
          ...ext,
        }
      )
    }
    return params;
  }

  parseRoute(route) {
    const doc = route.doc || {};
    const body = doc.body || {};
    const query = doc.query || {};
    const apiDoc = {
      tags: doc.tags || [],
      summary: doc.summary || "",
      description: doc.description || "",
      operationId: route.path,
      consumes: doc.consumes || ["application/json", "application/xml"],
      produces: doc.produces || ["application/json", "application/xml"],
      parameters: this.parseParam(route, doc, 'body')
        .concat(this.parseParam(route, doc, 'query')),
      responses: doc.responses || {},
      security: [{ "api_key": [] }]
    }

    return {
      [route.path]: {
        [route.method.toLowerCase()]: apiDoc
      }
    }
  }
}