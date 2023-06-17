import { CONFIG } from "../../core/Config.mjs";
import { HttpServerPlugin } from "../../core/Plugin.mjs";
import { FileUtils, URLUtils } from "../../core/Utils.mjs";

export class SPAPlugin extends HttpServerPlugin {
  constructor({ manifest, dist }) {
    super();
    this.manifest = manifest;
    this.dist = dist;
  }

  async setup(httpServer) {
    super.setup(httpServer);
    if (CONFIG.ENVIRONMENT !== 'development') {
      httpServer.addPublicPath(this.dist);
    }
    httpServer.app.use((req, res, next) => {
      res.locals.assets = (path) => {
        if (CONFIG.ENVIRONMENT === 'development') {
          return URLUtils.join('http://localhost:5173', path);
        } else {
          return this.manifest[path].file;
        }
      }
      next();
    })
  }
}