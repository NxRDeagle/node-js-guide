import { Response, Router } from "express";
import { ExpressFunction } from "../types";

export interface IControllerRoute {
  path: string;
  func: ExpressFunction;
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
