import { Controller } from "../../../core/controller.mjs";

export default class UserController extends Controller {

  getRoutes() {
    return [
      { method: 'GET', path: '/user/info', handlers: [this.index] }
    ];
  }

  index(req, res) {
    res.send({
      hello: 'world'
    })
  }
}
