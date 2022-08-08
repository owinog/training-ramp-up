import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class FileUploadServiceController {
  constructor(@InjectQueue('file-queue') private queue: Queue) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const timeNo = (Date.now() / 100)
            .toString()
            .substring(3)
            .split('.')[0];
          callback(null, name + timeNo + fileExtName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.queue.add('process-job', file.filename);
  }
}
