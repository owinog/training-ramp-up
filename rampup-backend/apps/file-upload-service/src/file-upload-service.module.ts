import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FileUploadServiceController } from './file-upload-service.controller';
import { fileUploadService } from './file-upload-service.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'file-queue',
    }),
  ],
  controllers: [FileUploadServiceController],
  providers: [fileUploadService],
})
export class FileUploadServiceModule {}
