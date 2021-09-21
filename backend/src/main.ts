import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';

import { AppModule } from './app.module';
import { ScheduleLib } from './utils/libs/schedule.lib';

import config from './config';

const serviceAccount = require('../firebase.json');

const { PORT } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  await app.listen(PORT);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const scheduleLib = app.get(ScheduleLib);

  scheduleLib.registerSchedule();

  Logger.log(`Server is listening on port ${PORT}`, 'Bootstrap');
}

bootstrap();
