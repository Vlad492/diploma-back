import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entity/users.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ nullable: true })
  message_id: string;
  @Column({ nullable: false })
  @ApiProperty({ nullable: true })
  payload: string;
  @Column({ nullable: false, default: false })
  @ApiProperty({ nullable: true, default: false })
  read: boolean;
  @ManyToOne(() => User, (user) => user.user_id, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  sender?: Partial<User>;
  @ManyToOne(() => User, (user) => user.user_id, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  receiver?: Partial<User>;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;
}
