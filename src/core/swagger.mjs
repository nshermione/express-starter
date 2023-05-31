import express from 'express';
import { getAbsoluteFSPath, SwaggerUtils } from './swagger-ui-dist/index.js';

export class ExpressSwagger {
  constructor({ httpServer, baseUrl = '/docs', swaggerJson }) {
    httpServer.app.use(baseUrl, express.static(getAbsoluteFSPath()));
    httpServer.app.get('/swagger.json', (req, res) => {
      res.send(swaggerJson)
    });
    httpServer.app.get(baseUrl, (req, res) => {
      let port = httpServer.serverConfig.PORT || 3000;
      res.send(SwaggerUtils.getIndexHtml({
        url: `http://localhost:${port}/swagger.json`,
        deepLinking: true,
        layout: "StandaloneLayout"
      }))
    });
  }

  parseParam(route, routeParams, parameterType = 'body') {
    let params = [];
    let method = route.method.toLowerCase();
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
    const apiDoc = {
      tags: doc.tags || [],
      summary: doc.summary || "",
      description: doc.description || "",
      operationId: route.path,
      consumes: doc.consumes || ["application/json", "application/xml"],
      produces: doc.produces || ["application/json", "application/xml"],
      parameters: doc.body.map(item => this.parseParam(route, item, 'body'))
                    .concat(doc.query.map(item => this.parseParam(route, item, 'query'))),
      responses: doc.responses || {},
      security: [{ "api_key": [] }]
    }

    return {
      [route.path]
      [route.method.toLowerCase()]: apiDoc
    }
  }
}