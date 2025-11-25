import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IUserController } from './users.controller.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { HTTPError } from '../errors/http-error.class';
import { IUserService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: LoggerService,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction,
	) {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'User already exists'));
		}
		this.ok(response, { email: result.email, id: result.id });
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, response: Response, next: NextFunction) {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HTTPError(401, 'Authorization error'));
		}
		const secret = this.configService.get('SECRET');
		const jwt = await this.signJWT(body.email, secret);
		this.ok(response, { jwt });
	}

	async info({ user }: Request, response: Response, next: NextFunction) {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(response, { email: userInfo?.email, id: userInfo?.id });
	}

	private async signJWT(email: string, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(error, token) => {
					if (error) {
						reject(error);
					}
					resolve(token as string);
				},
			);
		});
	}
}
