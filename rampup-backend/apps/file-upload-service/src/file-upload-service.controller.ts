import { Controller, Get } from '@nestjs/common';
import { FileUploadServiceService } from './file-upload-service.service';

@Controller()
export class FileUploadServiceController {
  constructor(private readonly fileUploadServiceService: FileUploadServiceService) {}

  @Get()
  getHello(): string {
    return this.fileUploadServiceService.getHello();
  }
}
