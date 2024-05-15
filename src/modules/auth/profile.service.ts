import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}

  async getProfile(userId: any): Promise<ProfileDto | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return null;
      }
      const userProfile: ProfileDto = {
        name: user.name,
        email: user.email,
        chatroomCount: 9,
        attachmentCount: 20,
        reactionCount: 5,
        messageCount: 8,
      };

      return userProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
}
