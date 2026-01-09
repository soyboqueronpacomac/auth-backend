import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { envs } from './config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          ttl: 50000,
          stores: [new KeyvRedis(envs.REDIS_URL)],
        };
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
