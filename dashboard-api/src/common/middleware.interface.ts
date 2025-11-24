import { ExpressFunction } from '../types';

export interface IMiddleware {
	execute: ExpressFunction;
}
