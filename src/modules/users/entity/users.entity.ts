import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ nullable: true })
  user_id: string;
  @Column({ nullable: false, unique: true })
  @ApiProperty({ nullable: true })
  email: string;
  @Column({ nullable: false, unique: true })
  @ApiProperty({ nullable: true })
  nickname: string;
  @Column({ nullable: false, unique: false })
  @ApiProperty({ nullable: true })
  password: string;
  @Column({ nullable: true, unique: true })
  publicKey: string;
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
