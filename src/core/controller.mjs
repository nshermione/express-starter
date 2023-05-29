import { RENDER_TYPE } from "./constant.mjs";
import { PugRenderer } from "./renderer.mjs";

export class Controller {
  constructor() {
    this.renderer = this.createRenderer();
  }

  createRenderer(config) {
    const rendererType = config.RENDER_TYPE || RENDER_TYPE.PUG;
    const RENDERERS = {
      [RENDER_TYPE.PUG]: PugRenderer
    }
    return new RENDERERS[rendererType](config);
  }

  getRoutes() { return []; }
}