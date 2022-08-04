import { Module } from '@nestjs/common';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';
import { BullModule } from '@nestjs/bull';
import { StudentListModule } from './student-list/student-list.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    StudentListModule,
  ],
  controllers: [FileProcessingController],
  providers: [FileProcessingService],
})
export class FileProcessingModule {}
