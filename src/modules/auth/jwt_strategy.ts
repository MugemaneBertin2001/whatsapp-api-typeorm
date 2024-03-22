import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entities/user.entity'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: User }, @Req() req): Promise<User> {
    const  {id}  = payload;

    const user = await this.userRepository.findOneByOrFail(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user; 

    return user;
  }
}
