import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';  
import { ChatRoom } from '../../chatrooms/entities/chatroom.entity';
import { Attachment } from 'src/modules/attachment/entities/attachment.entity'; 

@Entity({name: "messages"})
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => ChatRoom)
  @JoinColumn({ name: 'chatRoomId' })
  chatRoom: ChatRoom;

  
  @ManyToOne(() => Attachment)
  @JoinColumn({ name: 'attachmentId' })
  attachments: Attachment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
