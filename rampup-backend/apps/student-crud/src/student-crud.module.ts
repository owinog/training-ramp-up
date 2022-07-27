import { Module } from '@nestjs/common';
import { StudentCrudController } from './student-crud.controller';
import { StudentCrudService } from './student-crud.service';

@Module({
  imports: [],
  controllers: [StudentCrudController],
  providers: [StudentCrudService],
})
export class StudentCrudModule {}
