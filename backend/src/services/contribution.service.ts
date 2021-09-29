import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { Contribution } from 'src/entities/contribution.entity';
import { ContributionRepository } from 'src/repositories/contribution.repository';
import { WeekdayRepository } from 'src/repositories/weekday.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GitHubLib } from 'src/utils/libs/github.lib';

import config from '../config';
import { Weekday } from 'src/entities/weekdays.entity';

type ProcessedContribution = {
  total: number;
  week: number;
  today: number;
  login: string;
  weekdays: ContributionWeekDay[];
};

type ContributionWeekDay = { count: number; day: number };

const WEEK = 7;

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
    private readonly weekdayRepository: WeekdayRepository,
    private readonly userRepository: UserRepository,
    private readonly gitHubLib: GitHubLib,
  ) {}

  async getContributionByUser(userId: string): Promise<Contribution> {
    const contribution = await this.contributionRepository.findOneByUserId(
      userId,
    );

    if (!contribution) {
      throw new NotFoundException('Contribution not found.');
    }

    return contribution;
  }

  async getWeekdaysByUser(userId: string): Promise<Weekday[]> {
    const weekdays = await this.weekdayRepository.findAllByUserIdOrderByDayASC(
      userId,
    );

    return weekdays;
  }

  private async getProcessedContributionByUser(
    username: string,
  ): Promise<ProcessedContribution> {
    const data = await this.gitHubLib.getContributionByUserFromAPI(username);

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

    // 마지막 주 커밋 목록
    const lastWeek = weeks.find((_, index) => index === weeks.length - 1);

    if (!lastWeek) {
      throw new NotFoundException('Week not found.');
    }

    const weekdays: ContributionWeekDay[] = [];

    for (let i = 0; i < WEEK; i++) {
      const contributionDay = lastWeek.contributionDays[i];

      if (contributionDay) {
        const { contributionCount, weekday } = contributionDay;

        weekdays.push({ count: contributionCount, day: weekday });
      } else {
        const { day } = weekdays[i - 1];

        weekdays.push({ count: 0, day: day + 1 });
      }
    }

    return {
      total: totalContributions,
      week: weekContributions,
      today: todayContributions,
      login: data.user.login,
      weekdays,
    };
  }

  async initContributions(): Promise<void> {
    await this.weekdayRepository.deleteAll();
    await this.contributionRepository.deleteAll();
  }

  async createContribution(username: string): Promise<void> {
    const { total, week, today, weekdays } =
      await this.getProcessedContributionByUser(username);

    const user = await this.userRepository.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const contribution = this.contributionRepository.create({
      user,
      total,
      week,
      today,
    });

    await Promise.all(
      weekdays.map((weekday) => {
        const { count, day } = weekday;
        const _weekdays = this.weekdayRepository.create({ count, day, user });

        return this.weekdayRepository.save(_weekdays);
      }),
    );

    await this.contributionRepository.save(contribution);
  }

  async updateContributions() {
    const users = await this.userRepository.findAll();

    const contributionResults = await Promise.all(
      users.map((user) => this.getProcessedContributionByUser(user.username)),
    );

    await Promise.all(
      contributionResults.map(async (contributionResult) => {
        if (contributionResult !== null) {
          const user = users.find(
            (user) => user.username === contributionResult.login,
          );

          if (user !== undefined) {
            const { total, week, today, weekdays } = contributionResult;

            if (today === 0 && user.allowFcm && user.fcmToken) {
              await this.sendMessage(user.fcmToken);
            }

            const contribution = this.contributionRepository.create({
              user,
              total,
              week,
              today,
            });

            await Promise.all(
              weekdays.map((weekday) => {
                const { count, day } = weekday;
                const _weekdays = this.weekdayRepository.create({
                  count,
                  day,
                  user,
                });

                return this.weekdayRepository.save(_weekdays);
              }),
            );

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
