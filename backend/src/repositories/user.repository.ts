import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneById(id: string): Promise<User | undefined> {
    return this.createQueryBuilder().where('id = :id', { id }).getOne();
  }

  findOneByUsername(username: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('username = :username', { username })
      .getOne();
  }

  findOneByIdLeftJoin(id: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.contribution', 'contribution')
      .where('user.id = :id', { id })
      .getOne();
  }

  findAll(): Promise<User[]> {
    return this.createQueryBuilder().getMany();
  }
}
