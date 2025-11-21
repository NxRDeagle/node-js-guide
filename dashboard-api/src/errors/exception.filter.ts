import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IExceptionFilter } from "./exception.filter.interface";
import { HTTPError } from "./http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(
    error: Error | HTTPError,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Ошибка ${error.statusCode} : ${error.message}`
      );
      response.status(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      response.status(500).send({ error: error.message });
    }
  }
}
