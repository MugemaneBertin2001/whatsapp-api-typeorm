import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ChatRoom } from './entities/chatroom.entity'; // Adjust the import path for the ChatRoom entity
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@UseGuards(AuthGuard())
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async create(createChatRoomDto: CreateChatRoomDto, creatorId: string): Promise<ChatRoom> {
    const createdRoom = this.chatRoomRepository.create({
      ...createChatRoomDto,
      creator: creatorId,
      participants: [creatorId],
    });
    return this.chatRoomRepository.save(createdRoom);
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find();
  }

  async findOne(roomId: any): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findOne({
      where:{
        id: roomId
      }
    });
    if (!room) {
        throw new NotFoundException('Chat room not found');
    }
    return room;
}


  async update(roomId: any, updateChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    const existingRoom = await this.chatRoomRepository.findOne({
      where:{
        id: roomId
      }
    });
    if (!existingRoom) {
      throw new NotFoundException('Chat room not found');
    }
    this.chatRoomRepository.merge(existingRoom, updateChatRoomDto);
    return this.chatRoomRepository.save(existingRoom);
  }

  async remove(roomId: string): Promise<string> {
    const result = await this.chatRoomRepository.delete(roomId);
    if (result.affected === 0) {
      throw new NotFoundException('Chat room not found');
    }
    return "Chat room deleted successfully";
  }

  async joinChatRoom(roomId: any, userId: string): Promise<boolean> {
    const room = await this.chatRoomRepository.findOne({
      where: {
        id: roomId
      }
    });

    if (!room) {
        throw new NotFoundException('Chat room not found');
    }

    const participantsSet = new Set(room.participants);
    if (participantsSet.has(userId.toString())) {
        room.participants = room.participants.filter(participantId => participantId !== userId.toString());
    } else {
        room.participants.push(userId.toString());
    }

    await this.chatRoomRepository.save(room);
    return true; 
}



}
