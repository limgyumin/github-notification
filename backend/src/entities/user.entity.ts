import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Contribution } from './contribution.entity';

@Entity('user')
export class User {
  @PrimaryColumn()
  id!: string;

  @Column({
    length: 510,
  })
  avatar!: string;

  @Column()
  username!: string;

  @Column()
  bio!: string;

  @OneToMany(() => Contribution, (contribution) => contribution.user)
  @JoinColumn({ name: 'contribution_id' })
  contributions!: Contribution[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;
}
