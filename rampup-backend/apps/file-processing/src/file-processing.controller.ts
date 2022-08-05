import { Controller, Get, Query } from '@nestjs/common';
import { StudentListProducerService } from './student-list/student-list.producer.service';
@Controller()
export class FileProcessingController {
  constructor(
    private readonly studentListProducer: StudentListProducerService,
  ) {}
}
