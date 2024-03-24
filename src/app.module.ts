import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConf from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { CustomConfigModule } from './modules/auth/config/config.module';
import { ChatRoomsModule } from './modules/chatrooms/chatrooms.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { MessageModule } from './modules/message/message.module';
import { ReactionsModule } from './modules/reactions/reactions.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer.kafka';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PassportModule } from '@nestjs/passport';
import { GatewayModule } from './websocket/websocket.module';



@Module({
  imports: [
  GatewayModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  CustomConfigModule,
  TypeOrmModule.forRoot(TypeOrmConf),
    AuthModule,
    ChatRoomsModule,
    MessageModule,
    ReactionsModule,
    AttachmentModule,
    KafkaModule,
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'message_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer,
  ],
  exports:[GatewayModule]
})
export class AppModule {}
