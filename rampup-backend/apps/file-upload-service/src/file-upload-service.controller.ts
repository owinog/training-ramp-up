import {
  Body,
  Controller,
  Get,
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

  @Get()
  getHello(): string {
    return this.fileUploadServiceService.getHello();
  }

  @UseInterceptors(
    FileInterceptor('file', { dest: './apps/file-upload-service/src/uploads' }),
  )
  @Post('file')
  uploadFile(
    @Body() body: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return { body, file: file.buffer.toString() };
  }
}
