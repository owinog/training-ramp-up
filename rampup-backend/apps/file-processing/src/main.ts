import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FileProcessingModule } from './file-processing.module';

async function bootstrap() {
  const app = await NestFactory.create(FileProcessingModule);
  await app.listen(5500);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
