import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;
}
