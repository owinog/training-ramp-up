import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StudentActionsModule } from './student-actions.module';

async function bootstrap() {
  const app = await NestFactory.create(StudentActionsModule);
  await app.listen(5000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
