import { Module } from '@nestjs/common';
import { FileProcessingController } from './file-processing.controller';
import { BullModule } from '@nestjs/bull';
import { StudentListProducerService } from './student-list/student-list.producer.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'fileQueue',
    }),
  ],
  controllers: [FileProcessingController],
  providers: [StudentListProducerService],
})
export class FileProcessingModule {}
