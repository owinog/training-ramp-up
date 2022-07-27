import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentCrudService {
  getHello(): string {
    return 'Hello World!';
  }
}
