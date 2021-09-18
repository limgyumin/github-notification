import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Contribution } from './contribution.entity';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => String)
  @PrimaryColumn()
  id!: string;

  @Field(() => String)
  @Column({
    length: 510,
  })
  avatar!: string;

  @Field(() => String)
  @Column()
  username!: string;

  @Field(() => String)
  @Column()
  bio!: string;

  @Field(() => Contribution)
  @OneToOne(() => Contribution)
  @JoinColumn({ name: 'contribution_id' })
  contribution!: Contribution;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;
}
