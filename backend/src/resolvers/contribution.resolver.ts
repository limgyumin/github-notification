import { Query, Resolver } from '@nestjs/graphql';

import { ContributionService } from 'src/services/contribution.service';

@Resolver()
export class ContributionResolver {
  constructor(private readonly contributionService: ContributionService) {}

  @Query(() => String)
  async getContributions() {
    return 'hello';
  }
}
