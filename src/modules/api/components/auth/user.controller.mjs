import { Controller } from "../../../../core/controller.mjs";

export default class UserController extends Controller {

  getRoutes() {
    return [
      { method: 'GET', path: '/user/info', handlers: [this.index] }
    ];
  }

  index(req, res) {
    this.renderer.render()
    res.send({
      hello: 'world'
    })
  }
}
