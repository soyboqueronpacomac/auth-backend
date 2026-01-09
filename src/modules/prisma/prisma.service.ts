import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('Auth - App');

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database Connected');
    } catch (error) {
       this.logger.error('Failed to connect to the database', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database Disconnected');
  }
}
