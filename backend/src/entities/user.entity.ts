import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Weekday } from './weekdays.entity';

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

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
    name: 'fcm_token',
  })
  fcmToken!: string | null;

  @Field(() => Boolean)
  @Column({ default: false, name: 'allow_fcm' })
  allowFcm!: boolean;

  @Field(() => [Weekday])
  @OneToMany(() => Weekday, (weekdays) => weekdays.user)
  weekdays!: Weekday[];

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;
}
