import { Controller } from "../../../core/controller.mjs";

export default class AuthController extends Controller {
  constructor() {
    super(import.meta);
  }
  
  getRoutes() {
    return [
      { method: 'GET', path: '/user/info', handlers: [this.index] }
    ];
  }

  index(req, res) {
    res.send({
      succes: true 
    })
  }
}
