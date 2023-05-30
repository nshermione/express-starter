import { Controller } from "../../core/controller.mjs";

export default class PageController extends Controller {
  constructor() {
    super(import.meta);
  }

  getRoutes() {
    return [
      { method: 'GET', path: '/', handlers: [this.home] },
      { method: 'GET', path: '/about', handlers: [this.about] },
    ]
  }

  async home(req, res) {
    res.send(this.render('pages/home.page.pug', { title: 'Home' }));
  }

  async about(req, res) {
    res.send(this.render('pages/about.page.pug', { title: 'About' }));
  }
}