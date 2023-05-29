import { RENDER_TYPE } from "./constant.mjs";
import { PugRenderer } from "./renderer.mjs";
import { Utils } from "./utils.mjs";

export class Controller {
  constructor(meta, config = {}) {
    this.meta = meta;
    this.renderer = this.createRenderer(config || {
      renderer: RENDER_TYPE.PUG
    });
    if (this.meta.url) {
      this.__dirname = Utils.dirname(this.meta.url);
    }
  }

  createRenderer(config = {}) {
    const rendererType = config.renderer || RENDER_TYPE.PUG;
    const RENDERERS = {
      [RENDER_TYPE.PUG]: PugRenderer,
    }
    return new RENDERERS[rendererType](config);
  }

  render(filePath, data, res) {
    return this.renderer.render(Utils.joinUrl(this.__dirname, filePath), data, res);
  }

  getRoutes() { return []; }
}