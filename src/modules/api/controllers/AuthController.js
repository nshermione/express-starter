import { Controller } from "../../../core/Controller.js";
import { Crypto } from "../../../core/Crypto.js";
import { HttpError } from "../../../core/Error.js";
import { __ } from "../../../plugins/http/LocalePlugin.js";
import { CODE } from "../../common/Constants.js";
import { SessionModel } from "../../common/models/SessionModel.js";
import { UserModel } from "../../common/models/UserModel.js";
import { AuthDocs } from "../docs/AuthDocs.js";
import jsonwebtoken from "jsonwebtoken";

export default class AuthController extends Controller {
  constructor() {
    super(import.meta);
  }

  getRoutes() {
    return [
      { method: 'POST', path: '/auth/login', handlers: [this.login], doc: AuthDocs.LOGIN }
    ];
  }

  index(req, res) {
    res.send({
      succes: true
    })
  }

  async login(req, res) {
    const { username, password, keep } = req.body;

    if (!username || !password) {
      throw new HttpError(__('Incorrect login credentials')); 
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new HttpError(__('Incorrect login credentials'));
    }

    const isCorrectPass = await Crypto.comparePassword(password, user.password);
    if (!isCorrectPass) {
      throw new HttpError(__('Incorrect login credentials'));
    }
    const accessToken = jsonwebtoken.sign({
      username,
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m'
    });

    let refreshTokenOptions = {};
    if (!keep) {
      refreshTokenOptions.expiresIn = '30d';
    }
    const refreshToken = jsonwebtoken.sign({
      username,
    }, process.env.ACCESS_TOKEN_SECRET, refreshTokenOptions);

    SessionModel.create({
      userId: user._id,
      token: refreshToken
    });

    res.send({
      code: CODE.SUCCESS,
      accessToken,
      refreshToken
    })
  }
}
