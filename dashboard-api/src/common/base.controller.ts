import { injectable } from 'inversify';
import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { ExpressReturnType } from './route.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(response: Response, code: number, message: T): ExpressReturnType {
		return response.status(code).json(message);
	}

	public ok<T>(response: Response, message: T): ExpressReturnType {
		return this.send<T>(response, 200, message);
	}

	public created(response: Response): ExpressReturnType {
		return response.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middlewares = route.middlewares?.map((middleware) =>
				middleware.execute.bind(middleware),
			);
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
