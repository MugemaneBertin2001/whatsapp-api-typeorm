import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@Controller('api/:chatRoomId/messages')
@UseGuards(AuthGuard('jwt'))
@WebSocketGateway()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @WebSocketServer()
  server;

  @Post()
  @SubscribeMessage('message')
  async createMessage(
    @Req() req,
    @Body() createMessageDto: CreateMessageDto,
    @Param('chatRoomId') chatRoomId: string,
  ) {
    try {
      if (!createMessageDto.content) {
        throw new BadRequestException('Message content is required.');
      }
      const createdMessage = await this.messageService.create({
        ...createMessageDto,
        senderId: req.user._id,
        chatRoomId,
      });

      return { message: 'Message created successfully', data: createdMessage };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      console.error('Failed to create message:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  @Patch(':msgId')
  async update(
    @Param('msgId') id: any,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    try {
      const updatedMessage = await this.messageService.update(
        id,
        updateMessageDto,
      );
      return updatedMessage;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error: '.concat(err.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: any): Promise<Message> {
    return this.messageService.remove(id);
  }
}
