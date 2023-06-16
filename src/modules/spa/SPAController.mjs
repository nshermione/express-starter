import { Controller } from "../../core/Controller.mjs";

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
    res.send(this.render('App.pug', { title: 'Single Page App' }));
  }
}