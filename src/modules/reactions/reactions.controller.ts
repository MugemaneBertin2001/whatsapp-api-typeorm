

import { Controller, Post, Body, Param, BadRequestException, Get, UseGuards, Req } from '@nestjs/common';
import { AddReactionDto } from './dto/add-reaction.dto';
import { ReactionService } from './reactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/chatRoom/messages/:messageId/reactions')
@UseGuards(AuthGuard('jwt'))
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  async addReaction(
    @Body() addReactionDto: AddReactionDto,
    @Req() req,
    @Param('messageId') messageId: string,
  ) {
    try {
      const validReactionTypes = ['thumbsup', 'love', 'crying', 'surprised'];
      if (!validReactionTypes.includes(addReactionDto.type)) {
        throw new BadRequestException('Invalid reaction type');
      }
      console.log(req.user.id)
      addReactionDto.userId = req.user.id;
      addReactionDto.messageId = messageId;
      const createdReaction = await this.reactionService.addReaction(addReactionDto);
      
      return { message: 'Reaction added successfully', data: createdReaction };
    } catch (error) {
      throw new BadRequestException('Failed to add reaction'.concat(error));
    }
  }

  @Get()
  async getReactionsForMessage(@Param('messageId') messageId: number) {
    try {
      const reactions = await this.reactionService.getReactionsForMessage(messageId);
      return { message: 'Reactions retrieved successfully', data: reactions };
    } catch (error) {
      console.error('Failed to get reactions:', error);
      throw new BadRequestException('Failed to get reactions');
    }
  }
}