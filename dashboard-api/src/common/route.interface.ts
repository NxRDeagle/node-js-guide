import { Response, Router } from 'express';
import { ExpressFunction } from '../types';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: ExpressFunction;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
