import { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';
import { App } from './app';

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	LoggerService: Symbol.for('LoggerService'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	ExceptionFilter: Symbol.for('ExceptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UsersRepository: Symbol.for('UsersRepository'),
};

export type ExpressFunction = (request: Request, response: Response, next: NextFunction) => void;

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}
