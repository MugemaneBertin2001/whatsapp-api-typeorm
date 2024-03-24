import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server;

  onModuleInit() {
    this.server.on('connection', (socket: { id: any; }) => {
      console.log(socket.id);
      console.log('Connected');
      
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}