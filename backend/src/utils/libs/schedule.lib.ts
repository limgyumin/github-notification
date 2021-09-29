import { Injectable, Logger } from '@nestjs/common';
import { Job, scheduleJob } from 'node-schedule';
import { ContributionService } from 'src/services/contribution.service';

@Injectable()
export class ScheduleLib {
  constructor(private readonly contributionService: ContributionService) {}

  registerSchedule(): Job {
    return scheduleJob('0 0 8,10,12,14,16,18,20 * * *', async () => {
      try {
        Logger.log('Schedule Start...', 'registerSchedule');
        await this.updateGitHub();
        Logger.log('Schedule End.', 'registerSchedule');
      } catch (e) {
        Logger.error(e, 'registerSchedule');
      }
    });
  }

  async updateGitHub(): Promise<void> {
    try {
      Logger.log('GitHub Contribution Updating...', 'updateGitHub');
      await this.contributionService.initContributions();
      await this.contributionService.updateContributions();
      Logger.log('GitHub Contribution Updated.', 'updateGitHub');
    } catch (e) {
      Logger.error(e, 'updateGitHub');
    }
  }
}
