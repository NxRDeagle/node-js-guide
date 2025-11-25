import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';

export class AuthGuard implements IMiddleware {
	execute(request: Request, response: Response, next: NextFunction) {
		const user = request?.user;
		if (user) {
			return next();
		}
		response.status(401).send({ error: 'Unauthorized' });
	}
}
