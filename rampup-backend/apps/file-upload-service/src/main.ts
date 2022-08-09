import { NestFactory } from '@nestjs/core';
import { FileUploadServiceModule } from './file-upload-service.module';

async function bootstrap() {
  const app = await NestFactory.create(FileUploadServiceModule);
  app.enableCors();
  await app.listen(5400);
}
bootstrap();
