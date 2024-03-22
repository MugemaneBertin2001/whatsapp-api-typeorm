import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attachment } from 'src/modules/attachment/entities/attachment.entity';
import { User } from 'src/modules/auth/entities/user.entity';
import { ChatRoom } from 'src/modules/chatrooms/entities/chatroom.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Reaction } from 'src/modules/reactions/entities/reactions.entity';

const TypeOrmConf: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', 
  port:  5432,
  username: 'postgres', 
  password: 'Mine@123', 
  database:'postgres', 
  entities: [User,ChatRoom,Message,Reaction,Attachment],
  synchronize: true,
};

export default TypeOrmConf;