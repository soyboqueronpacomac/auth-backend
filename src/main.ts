import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  //app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    origin: envs.ALLOWED_ORIGINS,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(envs.PORT);
  logger.log(`🚀 Server running on port ${envs.PORT}`);
}
bootstrap();
