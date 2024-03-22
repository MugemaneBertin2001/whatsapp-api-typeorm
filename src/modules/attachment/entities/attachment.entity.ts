import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Message } from '../../message/entities/message.entity'; // Import the Message entity if not already imported

@Entity({name:"attachments"})
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  size: number;

  @ManyToOne(() => Message)
  @JoinColumn({ name: 'messageId' })
  message: Message;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
