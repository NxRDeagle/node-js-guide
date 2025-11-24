import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { IBootstrapReturn, TYPES } from './types';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	options.bind<IUserController>(TYPES.UserController).to(UserController);
	options.bind<IUserService>(TYPES.UserService).to(UserService);
	options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	options.bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
