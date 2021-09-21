import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContributionRepository } from 'src/repositories/contribution.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ContributionService } from 'src/services/contribution.service';

import { GitHubLib } from 'src/utils/libs/github.lib';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionRepository, UserRepository])],
  exports: [ContributionService],
  providers: [ContributionService, GitHubLib],
})
export class ContributionModule {}
