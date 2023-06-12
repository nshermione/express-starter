import { Locale, __ } from "../../core/Locale.mjs";
import { HttpServerPlugin } from "../../core/Plugin.mjs";

export class HttpLocalePlugin extends HttpServerPlugin {

  constructor({ folder }) {
    super();
    this.folder = folder;
  }

  async setup(httpServer) {
    super.setup(httpServer);
    Locale.addFolder(this.folder);
  }

  async preRequest(req, res, next) {
    res.locals.__ = __;
    next();
  }
}