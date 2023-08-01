import { Controller } from "../../../core/Controller.js";
import { HttpError } from "../../../core/Error.js";
import { Renderer } from "../../../core/Renderer.js";
import { VueSSRRenderer } from "../../../plugins/http/SPAPlugin.js";

export default class WebSSRController extends Controller {
  constructor() {
    super(import.meta, {
      renderer: new VueSSRRenderer()
    });
  }

  getRoutes() {
    return [
      { method: 'GET', path: '*', handlers: [this.index] },
    ]
  }

  async index(req, res) {
    const extension = req.url.split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif', 'ico'].includes(extension)) {
      throw new HttpError("Not found");
    }
    res.srrView();
  }
}