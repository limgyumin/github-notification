import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GitHubLib } from 'src/utils/libs/github.lib';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { ContributionService } from './contribution.service';
import { JwtDTO } from 'src/utils/dto/jwt.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly gitHubLib: GitHubLib,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly contributionService: ContributionService,
  ) {}

  async auth(code: string): Promise<string> {
    const gitHubUser = await this.gitHubLib.getGitHubUser(code);

    if (!gitHubUser) {
      throw new NotFoundException('user not found.');
    }

    const existUser = await this.userRepository.findOneById(gitHubUser.id);

    if (existUser) {
      return this.signToken(existUser);
    }

    const { id, login, avatar_url, bio } = gitHubUser;

    const user = this.userRepository.create({ id, bio });

    user.avatar = avatar_url;
    user.username = login;

    const savedUser = await this.userRepository.save(user);

    await this.contributionService.createContribution(gitHubUser.login);

    return this.signToken(savedUser);
  }

  async allowNotification(user: User): Promise<User> {
    user.allowFcm = !user.allowFcm;

    return await this.userRepository.save(user);
  }

  private signToken({ id }: User): string {
    const payload: JwtDTO = {
      id,
    };

    return this.jwtService.sign(payload);
  }
}
