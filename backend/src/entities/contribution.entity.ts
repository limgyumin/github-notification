import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity('contribution')
export class Contribution {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field(() => Int)
  @Column({ name: 'week' })
  week!: number;

  @Field(() => Int)
  @Column({ name: 'total' })
  total!: number;

  @Field(() => Int)
  @Column({ name: 'today' })
  today!: number;
}
