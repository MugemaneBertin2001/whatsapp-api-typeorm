import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chatRooms' })
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  creator: string;

  @Column('simple-array', { default: [] })
  participants: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
