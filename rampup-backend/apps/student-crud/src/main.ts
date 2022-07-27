import { NestFactory } from '@nestjs/core';
import { StudentCrudModule } from './student-crud.module';

async function bootstrap() {
  const app = await NestFactory.create(StudentCrudModule);
  await app.listen(3000);
}
bootstrap();
