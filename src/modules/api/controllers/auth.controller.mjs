import { Controller } from "../../../core/controller.mjs";
import { AuthDocs } from "../docs/auth.docs.mjs";

export default class AuthController extends Controller {
  constructor() {
    super(import.meta);
  }

  getRoutes() {
    return [
      { method: 'GET', path: '/user/info', handlers: [this.index], doc: AuthDocs.GET_USER_INFO }
    ];
  }

  index(req, res) {
    res.send({
      succes: true
    })
  }
}
