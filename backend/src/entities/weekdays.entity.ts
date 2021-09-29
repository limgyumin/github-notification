import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity('weekday')
export class Weekday {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.weekdays)
  @JoinColumn({ name: 'user_id' })
  user!: User | null;

  @Field(() => Int)
  @Column()
  count!: number;

  @Field(() => Int)
  @Column()
  day!: number;
}
