import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ChatRoom } from './entities/chatroom.entity'; 
import { ChatRoomsController } from './chatrooms.controller';
import { ChatRoomsService } from './chatrooms.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([ChatRoom]), 
  ],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
})
export class ChatRoomsModule {}
