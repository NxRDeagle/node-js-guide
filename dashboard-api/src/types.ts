import { NextFunction, Request, Response } from "express";

export const TYPES = {
  Application: Symbol.for("Application"),
  ILogger: Symbol.for("ILogger"),
  LoggerService: Symbol.for("LoggerService"),
  UserController: Symbol.for("UserController"),
  ExceptionFilter: Symbol.for("ExceptionFilter"),
};

export type ExpressFunction = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;
