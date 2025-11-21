import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { TYPES } from "../types";
import { IUserController } from "./users.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) LoggerService: LoggerService) {
    super(LoggerService);
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
