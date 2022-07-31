import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
