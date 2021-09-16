import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import config from './config';

const { PORT } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  await app.listen(PORT);

  Logger.log(`Server is listening on port ${PORT}`, 'Bootstrap');
}

bootstrap();
