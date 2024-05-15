import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Reactions' })
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  messageId: number;

  @CreateDateColumn()
  createdAt: Date;
}
