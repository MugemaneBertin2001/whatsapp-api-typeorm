import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity'; 
import { UpdateMessageDto } from './dto/update-message.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject('MESSAGE_SERVICE') private rabbitClient: ClientProxy
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    if (!createMessageDto.content) {
      throw new BadRequestException('Message content is required.');
    }
    const partialMessage: Partial<Message> = {
      content: createMessageDto.content,
    };
    const createdMessage = this.messageRepository.create(partialMessage);
    const savedMessage =  this.messageRepository.save(createdMessage);
    this.rabbitClient.emit("Message-sent",createdMessage
     )
    return savedMessage
  }
  

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findOne(id: any): Promise<Message> {
    const message = await this.messageRepository.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async update(id: any, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const existingMessage = await this.messageRepository.findOne({
      where:{
        id: id
      }
    });
    if (!existingMessage) {
      throw new NotFoundException('Message not found');
    }
    existingMessage.content = updateMessageDto.content
    const updatedMessage = {
      ...existingMessage
    };
    return this.messageRepository.save(updatedMessage);
  }
  

  async remove(id: number): Promise<any> {
    try {
      const result = await this.messageRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Message not found');
      }
      return {result}
    } catch (error) {
      throw new NotFoundException('Message not found');
    }
  }
}
