import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContributionRepository } from 'src/repositories/contribution.repository';
import { ContributionResolver } from 'src/resolvers/contribution.resolver';
import { ContributionService } from 'src/services/contribution.service';

import { GitHubLib } from 'src/utils/libs/github.lib';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionRepository])],
  exports: [ContributionService],
  providers: [ContributionService, ContributionResolver, GitHubLib],
})
export class ContributionModule {}
