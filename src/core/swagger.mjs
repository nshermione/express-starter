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
}