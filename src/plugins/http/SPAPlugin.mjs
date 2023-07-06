import fs from "fs";
import { createServer } from "vite";
import { CONFIG } from "../../core/Config.mjs";
import { HttpServerPlugin } from "../../core/Plugin.mjs";
import { FileUtils, URLUtils } from "../../core/Utils.mjs";

export class SPAPlugin extends HttpServerPlugin {
  constructor({ manifest, dist, root, main }) {
    super();
    this.manifest = manifest;
    this.dist = dist;
    this.root = root;
    this.main = main;
    this.clientDevPort = 5137;
  }

  async setup(httpServer) {
    super.setup(httpServer);

    httpServer.app.use((req, res, next) => {
      res.locals.assets = (path) => {
        if (CONFIG.ENVIRONMENT === 'development') {
          return URLUtils.join(`http://localhost:${this.clientDevPort}`, path);
        } else {
          return this.manifest[path].file;
        }
      }
      next();
    });

    if (CONFIG.ENVIRONMENT === 'development') {
      const server = await createServer({
        root: this.root,
        server: {
          port: this.clientDevPort ,
        },
      });
      await server.listen();
      this.logger.info("Start SPA client dev server");
      server.printUrls();
    } else {
      if (!fs.existsSync(this.dist)) {
        throw new Error(`Please build before run SPA app in ${CONFIG.ENVIRONMENT} environment`);
      }
      httpServer.addPublicPath(this.dist);
    }
  }
}