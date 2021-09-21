import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Contribution } from 'src/entities/contribution.entity';

@EntityRepository(Contribution)
export class ContributionRepository extends Repository<Contribution> {
  deleteAll(): Promise<DeleteResult> {
    return this.createQueryBuilder().delete().execute();
  }

  findOneByUserId(userId: string): Promise<Contribution | undefined> {
    return this.createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getOne();
  }
}
