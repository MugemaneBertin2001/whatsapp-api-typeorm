// reactions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reactions.entity'; 
import { ReactionService } from './reactions.service';
import { ReactionController } from './reactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction]),  
  ],
  controllers: [ReactionController], 
  providers: [ReactionService], 
})
export class ReactionsModule {}
