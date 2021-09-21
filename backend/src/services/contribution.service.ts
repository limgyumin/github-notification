import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { Contribution } from 'src/entities/contribution.entity';
import { ContributionRepository } from 'src/repositories/contribution.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GitHubLib } from 'src/utils/libs/github.lib';

import config from '../config';

type ContributionResult = {
  total: number;
  week: number;
  today: number;
  login: string;
};

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
    private readonly userRepository: UserRepository,
    private readonly gitHubLib: GitHubLib,
  ) {}

  async getContribution(userId: string): Promise<Contribution> {
    const contribution = await this.contributionRepository.findOneByUserId(
      userId,
    );

    if (!contribution) {
      throw new NotFoundException('Contribution not found.');
    }

    return contribution;
  }

  private async getContributions(
    username: string,
  ): Promise<ContributionResult> {
    const data = await this.gitHubLib.getContributionByUser(username);

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

    return {
      total: totalContributions,
      week: weekContributions,
      today: todayContributions,
      login: data.user.login,
    };
  }

  async initContributions(): Promise<void> {
    await this.contributionRepository.deleteAll();
  }

  async createContribution(username: string): Promise<Contribution> {
    const { total, week, today } = await this.getContributions(username);

    const user = await this.userRepository.findOneByUsername(username);

    const contribution = this.contributionRepository.create({
      user,
      totalContributions: total,
      weekContributions: week,
      todayContributions: today,
    });

    return await this.contributionRepository.save(contribution);
  }

  async updateContributions() {
    const users = await this.userRepository.findAll();

    const contributionResults = await Promise.all(
      users.map((user) => this.getContributions(user.username)),
    );

    await Promise.all(
      contributionResults.map((contributionResult) => {
        if (contributionResult !== null) {
          const user = users.find(
            (user) => user.username === contributionResult.login,
          );

          if (user !== undefined) {
            const { total, week, today } = contributionResult;

            if (!today) {
              // this.sendMessage('');
            }

            const contribution = this.contributionRepository.create();

            contribution.user = user;
            contribution.totalContributions = total;
            contribution.weekContributions = week;
            contribution.todayContributions = today;

            return this.contributionRepository.save(contribution);
          }
        }
      }),
    );
  }

  async sendMessage(token: string): Promise<void> {
    const message: admin.messaging.Message = {
      webpush: {
        notification: {
          icon: config.NOTIFICATION_ICON,
          title: '아직 커밋을 하지 않으셨습니다!',
          body: '1일 1커밋이 무너지고 말거에요...',
          click_action: config.NOTIFICATION_LINK,
        },
      },
      data: {
        score: '850',
        time: '2:45',
      },
      token,
    };

    try {
      await admin.messaging().send(message);
      Logger.log('FCM message sended.', 'sendMessage');
    } catch (e) {
      Logger.error(e, 'sendMessage');
    }
  }
}
