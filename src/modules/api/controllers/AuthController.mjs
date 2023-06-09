import { Controller } from "../../../core/Controller.mjs";
import { Crypto } from "../../../core/Crypto.mjs";
import { HttpError } from "../../../core/Error.mjs";
import { __ } from "../../../core/Locale.mjs";
import { CODE } from "../../common/Constants.mjs";
import { SessionModel } from "../../common/models/SessionModel.mjs";
import { UserModel } from "../../common/models/UserModel.mjs";
import { AuthDocs } from "../docs/AuthDocs.mjs";
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
