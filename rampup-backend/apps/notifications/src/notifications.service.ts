import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  getHello(): string {
    return 'This is the notifications app';
  }
}
