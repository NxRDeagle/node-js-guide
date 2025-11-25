import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(request: Request, response: Response, next: NextFunction) {
		const authorization = request.headers?.authorization;
		if (authorization) {
			verify(authorization.split(' ')[1], this.secret, (error, payload) => {
				if (error) {
					next();
				} else if (payload && typeof payload !== 'string') {
					request.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
