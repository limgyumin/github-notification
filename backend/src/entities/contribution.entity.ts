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
  @Column({ name: 'week_contributions' })
  weekContributions!: number;

  @Field(() => Int)
  @Column({ name: 'total_contributions' })
  totalContributions!: number;

  @Field(() => Int)
  @Column({ name: 'today_contributions' })
  todayContributions!: number;
}
