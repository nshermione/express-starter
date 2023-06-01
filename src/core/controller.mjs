import { RENDER_TYPE } from "./Constant.mjs";
import { PugRenderer } from "./Renderer.mjs";
import { FileUtils } from "./Utils.mjs";

export class Controller {
  constructor(meta, config = {}) {
    this.meta = meta;
    this.renderer = this.createRenderer(config || {
      renderer: RENDER_TYPE.PUG
    });
    if (this.meta.url) {
      this.__dirname = FileUtils.dirname(this.meta.url);
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
    return this.renderer.render(FileUtils.joinUrl(this.__dirname, filePath), data, res);
  }

  getRoutes() { return []; }
}