import { ExpressFunction } from '../types';

export interface IUserController {
	register: ExpressFunction;
	login: ExpressFunction;
}
