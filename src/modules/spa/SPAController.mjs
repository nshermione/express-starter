import { Controller } from "../../core/Controller.mjs";
import { HttpError } from "../../core/Error.mjs";

export default class SPAController extends Controller {
  constructor() {
    super(import.meta);
  }

  getRoutes() {
    return [
      { method: 'GET', path: '*', handlers: [this.index] },
    ]
  }

  async index(req, res) {
    const extension = req.url.split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      throw new HttpError("Not found");
    }
    res.view('App.pug', { title: 'Single Page App' });
  }
}