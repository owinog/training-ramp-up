import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadServiceService } from './file-upload-service.service';
import { Express } from 'express';

@Controller()
export class FileUploadServiceController {
  constructor(
    private readonly fileUploadServiceService: FileUploadServiceService,
  ) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return { file };
  }
}
