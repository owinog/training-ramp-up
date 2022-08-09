import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(5350, {
  cors: { origin: '*' },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Initialised');
  }

  @SubscribeMessage('add')
  onAddStudent(@MessageBody() addStudentNotification: string): void {
    console.log(addStudentNotification);
    this.server.emit('add', addStudentNotification);
  }

  @SubscribeMessage('update')
  onUpdatStudent(@MessageBody() updateStudentNotification: string): void {
    console.log(updateStudentNotification);
    this.server.emit('update', updateStudentNotification);
  }

  @SubscribeMessage('remove')
  onRemoveStudent(@MessageBody() removeStudentNotification: string): void {
    console.log(removeStudentNotification);
    this.server.emit('remove', removeStudentNotification);
  }
}
