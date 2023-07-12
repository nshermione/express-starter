import fs from "fs";
import path from "path";
import { createServer } from "vite";
import { CONFIG } from "../../core/Config.js";
import { HttpServerPlugin } from "../../core/Plugin.js";
import { FileUtils, URLUtils } from "../../core/Utils.js";

export class SPAPlugin extends HttpServerPlugin {
  constructor({ manifest, dist, root, assetFolder }) {
    super();
    this.root = root;
    this.assetFolder = path.join(root, assetFolder);
    this.manifestFile = manifest; 
    this.dist = path.join(root, dist);
    this.clientDevPort = 5137;
    if (CONFIG.ENVIRONMENT !== 'development') {
      this.manifest = FileUtils.readJsonFile({ filePath: path.join(this.root, this.manifestFile) });
    }
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
      httpServer.addPublicPath(this.assetFolder);
      httpServer.app.use((req, res, next) => {
        if (/^\/@fs.*$/.test(req.url)) {
          res.sendFile(req.url.replace('/@fs/', ''));
          return;
        }
        next();
      });
      const server = await createServer({
        root: this.root,
        server: {
          port: this.clientDevPort,
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