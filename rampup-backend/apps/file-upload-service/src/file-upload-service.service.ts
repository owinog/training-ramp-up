import { Injectable } from '@nestjs/common';

@Injectable()
export class fileUploadService {
  getHello(): string {
    return 'This is the file upload service app';
  }
}
