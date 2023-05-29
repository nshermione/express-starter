export class JwtGuard {
  static onRequest(req, res, next) {
    next();
  }
}