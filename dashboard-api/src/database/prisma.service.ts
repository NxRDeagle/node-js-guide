import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect() {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Connected to db successfully');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`[PrismaService] Db connection error: ${error.message}`);
			}
		}
	}

	async disconnect() {
		await this.client.$disconnect();
	}
}
