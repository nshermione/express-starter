import { Controller } from "../../../core/Controller.mjs";
import { UserModel } from "../../common/models/UserModel.mjs";
import { AuthDocs } from "../docs/AuthDocs.mjs";
import jsonwebtoken from "jsonwebtoken";

export default class AuthController extends Controller {
  constructor() {
    super(import.meta);
  }

  getRoutes() {
    return [
      { method: 'POST', path: '/auth/login', handlers: [this.login] }
    ];
  }

  index(req, res) {
    res.send({
      succes: true
    })
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username  });
    if (!user) {
      throw new Error('Invalid user, please try again!');
    }
    const accessToken = jsonwebtoken.sign({
      username,
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m'
    });
  }
}
