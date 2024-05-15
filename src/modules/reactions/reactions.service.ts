import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction } from './entities/reactions.entity';
import { AddReactionDto } from './dto/add-reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ) {}

  async addReaction(addReactionDto: AddReactionDto): Promise<Reaction> {
    const { type, userId, messageId } = addReactionDto;
    const reactionData: Partial<Reaction> = {
      type,
      userId: parseInt(userId),
      messageId: parseInt(messageId),
    };

    try {
      const reaction = this.reactionRepository.create(reactionData);
      return await this.reactionRepository.save(reaction);
    } catch (error) {
      throw new Error('Failed to add reaction');
    }
  }

  async getReactionsForMessage(messageId: number): Promise<Reaction[]> {
    try {
      const reactions = await this.reactionRepository.find({
        where: { messageId },
      });

      if (!reactions || reactions.length === 0) {
        throw new NotFoundException('Reactions not found');
      }

      return reactions;
    } catch (error) {
      console.error('Failed to get reactions for message:', error);
      throw new Error('Failed to get reactions for message');
    }
  }
}
