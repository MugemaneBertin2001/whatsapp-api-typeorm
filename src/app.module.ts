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

@Module({
  imports: [
  CustomConfigModule,
  TypeOrmModule.forRoot(TypeOrmConf),
    AuthModule,
    ChatRoomsModule,
    MessageModule,
    ReactionsModule,
    AttachmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
