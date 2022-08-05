import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class StudentListProducerService {
  constructor(@InjectQueue('fileQueue') private queue: Queue) {}

  async addFileToQueue(file: File) {
    await this.queue.add('file-processing-job', {
      file: file,
    });
  }
}
