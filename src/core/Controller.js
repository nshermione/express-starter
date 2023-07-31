import { RENDER_TYPE } from "./Constant.js";
import { PugRenderer } from "./Renderer.js";
import { FileUtils } from "./Utils.js";

export class Controller {
  constructor(meta, config = {}) {
    this.meta = meta;
    this.renderer = this.createRenderer(config || {
      rendererType: RENDER_TYPE.PUG
    });
    if (this.meta.url) {
      this.__dirname = FileUtils.dirname(this.meta.url);
    }
  }

  createRenderer(config = {}) {
    if (config.renderer) {
      return config.renderer;
    }
    const rendererType = config.rendererType || RENDER_TYPE.PUG;
    const RENDERERS = {
      [RENDER_TYPE.PUG]: PugRenderer,
    }
    return new RENDERERS[rendererType](config);
  }

  render(filePath, data, res) {
    return this.renderer.render(FileUtils.joinUrl(this.__dirname, filePath), data, res);
  }

  getRoutes() { return []; }
}