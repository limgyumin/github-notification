import { EntityRepository, Repository } from 'typeorm';
import { Contribution } from 'src/entities/contribution.entity';

@EntityRepository(Contribution)
export class ContributionRepository extends Repository<Contribution> {}
