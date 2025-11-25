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
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';
import 'reflect-metadata';

const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	options.bind<IUserController>(TYPES.UserController).to(UserController);
	options.bind<IUserService>(TYPES.UserService).to(UserService);
	options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	options.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	options.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	options.bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
