import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  app.enableCors();
  await app.listen(5300);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
