import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryGeneratedColumn()
  idx!: number;

  @ManyToOne(() => User, (user) => user.contributions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'week_contributions' })
  weekContributions!: number;

  @Column({ name: 'total_contributions' })
  totalContributions!: number;

  @Column({ name: 'today_contribution' })
  todayContribution!: number;
}
