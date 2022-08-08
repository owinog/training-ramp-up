import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Student } from './student/student.entity';

@Processor('file-queue')
export class FileProcessingConsumer {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  @Process('process-job')
  readOperationJob(job: Job) {
    console.log(job);
  }
}
