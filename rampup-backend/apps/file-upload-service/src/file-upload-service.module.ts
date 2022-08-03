import { Module } from '@nestjs/common';
import { FileUploadServiceController } from './file-upload-service.controller';
import { FileUploadServiceService } from './file-upload-service.service';

@Module({
  imports: [],
  controllers: [FileUploadServiceController],
  providers: [FileUploadServiceService],
})
export class FileUploadServiceModule {}
