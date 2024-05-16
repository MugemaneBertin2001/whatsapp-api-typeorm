import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CustomConfigModule } from './modules/auth/config/config.module';
import { ChatRoomsModule } from './modules/chatrooms/chatrooms.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { MessageModule } from './modules/message/message.module';
import { ReactionsModule } from './modules/reactions/reactions.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer.kafka';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GatewayModule } from './websocket/websocket.module';
import rabbitMQConfig from './config/rabbitMQconf';
import TypeOrmConf from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    ClientsModule.register([rabbitMQConfig]),
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
  exports: [GatewayModule],
})
export class AppModule {}
