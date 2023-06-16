import { Controller } from "../../core/Controller.mjs";

export default class WebPageController extends Controller {
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
    res.send(this.render('pages/HomePage.pug', { title: 'Home' }));
  }

  async about(req, res) {
    res.send(this.render('pages/AboutPage.pug', { title: 'About' }));
  }
}