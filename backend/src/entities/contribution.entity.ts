import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('contribution')
export class Contribution {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
