import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { schema } from './student/schema';
import { Student } from './student/student.entity';

@Processor('file-queue')
export class FileProcessingConsumer {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async readFile(filename: string) {
    Logger.log('Reading File: ' + filename);

    const readXlsxFile = require('read-excel-file/node');
    const filePath = process.cwd() + '\\uploads\\' + filename;
    await readXlsxFile(filePath, { schema }).then(({ rows, errors }) => {
      errors.length != 0
        ? Logger.log('Errors found in File: ' + errors)
        : Logger.log('No errors in file');

      this.processFile(rows);
    });
  }

  async processFile(rows) {
    Logger.log('Processing Data: ' + rows.length + ' Records found');

    for (let i = 0; i < rows.length; i++) {
      const student: Student = {
        id: undefined,
        studentName: rows[i].StudentName,
        gender: rows[i].gender,
        address: rows[i].address,
        phone: rows[i].phone,
        dob: rows[i].dob,
        age: rows[i].age,
        deletedAt: null,
      };
      this.studentRepository.create(student);
      await this.studentRepository.save(student);

      Logger.log(i + 1 + ' - added ' + student.studentName);
    }
  }

  @Process('process-job')
  readOperationJob(job: Job) {
    this.readFile(job.data);
  }
}
