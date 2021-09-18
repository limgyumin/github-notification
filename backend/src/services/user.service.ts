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

    const contribution = await this.contributionService.createContribution(
      gitHubUser.login,
    );

    const { id, name, login, avatar_url, bio } = gitHubUser;

    const user = this.userRepository.create({ id, bio, contribution });

    user.avatar = avatar_url;
    user.username = name || login;

    const savedUser = await this.userRepository.save(user);

    return this.signToken(savedUser);
  }

  private signToken({ id }: User): string {
    const payload: JwtDTO = {
      id,
    };

    return this.jwtService.sign(payload);
  }
}
