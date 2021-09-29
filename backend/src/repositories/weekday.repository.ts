import { Weekday } from 'src/entities/weekdays.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';

@EntityRepository(Weekday)
export class WeekdayRepository extends Repository<Weekday> {
  deleteAll(): Promise<DeleteResult> {
    return this.createQueryBuilder().delete().execute();
  }

  findAllByUserIdOrderByDayASC(userId: string): Promise<Weekday[]> {
    return this.createQueryBuilder()
      .where('user_id = :userId', { userId })
      .orderBy('day', 'ASC')
      .getMany();
  }
}
