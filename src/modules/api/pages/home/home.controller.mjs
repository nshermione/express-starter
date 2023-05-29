import { RENDER_TYPE } from "../../../../core/constant.mjs";
import { Controller } from "../../../../core/controller.mjs";

export default class HomeController extends Controller {
  constructor() {
    super(import.meta);
  }

  getRoutes() {
    return [
      { method: 'GET', path: '/', handlers: [this.index] }
    ];
  }

  async index(req, res) {
    res.send(this.render('home.page.pug', { pageTitle: 'home page'}));
  }
}
