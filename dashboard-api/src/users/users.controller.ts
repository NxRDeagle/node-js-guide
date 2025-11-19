import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  register(request: Request, response: Response, next: NextFunction) {
    this.ok(response, "register");
  }
  login(request: Request, response: Response, next: NextFunction) {
    this.ok(response, "login");
  }
}
