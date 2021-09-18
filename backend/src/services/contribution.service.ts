import { Injectable, NotFoundException } from '@nestjs/common';

import { ContributionRepository } from 'src/repositories/contribution.repository';
import { GitHubLib } from 'src/utils/libs/github.lib';

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
    private readonly gitHubLib: GitHubLib,
  ) {}

  async createContribution(userId: string) {
    const data = await this.gitHubLib.getContributionByUser(userId);

    if (data === null) {
      throw new NotFoundException('User not found.');
    }

    let weekContributions: number = 0;
    let todayContributions: number = 0;

    const { totalContributions, weeks } =
      data.user.contributionsCollection.contributionCalendar;

    weeks.forEach((week, index) => {
      if (index === weeks.length - 1) {
        week.contributionDays.forEach((contribution, index) => {
          weekContributions += contribution.contributionCount;

          if (index === week.contributionDays.length - 1) {
            todayContributions = contribution.contributionCount;
          }
        });
      }
    });

    const contribution = this.contributionRepository.create({
      weekContributions,
      totalContributions,
      todayContributions,
    });

    return await this.contributionRepository.save(contribution);
  }
}
