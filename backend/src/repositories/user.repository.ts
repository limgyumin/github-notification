import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneById(id: string) {
    return this.createQueryBuilder().where('id = :id', { id }).getOne();
  }

  findOneByIdLeftJoin(id: string) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.contribution', 'contribution')
      .where('user.id = :id', { id })
      .getMany();
  }
}
