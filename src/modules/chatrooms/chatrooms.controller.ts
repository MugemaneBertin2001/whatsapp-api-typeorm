import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatRoomsService } from './chatrooms.service';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ChatRoom } from './entities/chatroom.entity';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/chat-rooms')
@UseGuards(AuthGuard('jwt'))
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post()
  async create(
    @Body() createChatRoomDto: CreateChatRoomDto,
    @Req() req,
  ): Promise<ChatRoom> {
    const creatorId = req.user.id; // Access user's ID from request object
    return this.chatRoomsService.create(createChatRoomDto, creatorId);
  }

  @Get()
  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') roomId: string): Promise<ChatRoom> {
    const room = await this.chatRoomsService.findOne(roomId);
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }
    return room;
  }

  @Put(':id')
  async update(
    @Param('id') roomId: string,
    @Body() updateChatRoomDto: CreateChatRoomDto,
  ): Promise<ChatRoom> {
    const updatedRoom = await this.chatRoomsService.update(
      roomId,
      updateChatRoomDto,
    );
    if (!updatedRoom) {
      throw new NotFoundException('Chat room not found');
    }
    return updatedRoom;
  }

  @Delete(':id')
  async remove(@Param('id') roomId: string): Promise<any> {
    const success = await this.chatRoomsService.remove(roomId);
    if (!success) {
      throw new NotFoundException('Chat room not found');
    }
    return success;
  }

  @Post(':id/join')
  async joinChatRoom(@Param('id') roomId: string, @Req() req): Promise<any> {
    const userId = req.user.id;
    const success = await this.chatRoomsService.joinChatRoom(roomId, userId);
    const joinedChatRoom = await this.chatRoomsService.findOne(roomId);

    if (success) {
      return joinedChatRoom;
    }
    if (!success) {
      throw new NotFoundException('Chat room not found');
    }
  }
}
