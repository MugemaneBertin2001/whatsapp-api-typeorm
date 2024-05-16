import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attachment } from 'src/modules/attachment/entities/attachment.entity';
import { User } from 'src/modules/auth/entities/user.entity';
import { ChatRoom } from 'src/modules/chatrooms/entities/chatroom.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Reaction } from 'src/modules/reactions/entities/reactions.entity';
import env from './env';

const TypeOrmConf: TypeOrmModuleOptions = {
  type: 'postgres',
  url: env.POSTGRES_URL,
  entities: [User, ChatRoom, Message, Reaction, Attachment],
  synchronize: true,
};

export default TypeOrmConf;
