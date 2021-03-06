import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Contribution } from 'src/entities/contribution.entity';

import { User } from 'src/entities/user.entity';
import { Weekday } from 'src/entities/weekdays.entity';
import { ContributionService } from 'src/services/contribution.service';
import { UserService } from 'src/services/user.service';
import { CtxUser } from 'src/utils/decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/utils/guards/ctx-auth.guard';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly contributionService: ContributionService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CtxUser() user: User): User {
    return user;
  }

  @ResolveField(() => Contribution)
  async contributions(@Parent() user: User) {
    return await this.contributionService.getContributionByUser(user.id);
  }

  @ResolveField(() => [Weekday])
  async weekdays(@Parent() user: User) {
    return await this.contributionService.getWeekdaysByUser(user.id);
  }

  @Mutation(() => String)
  async auth(@Args('code') code: string): Promise<string> {
    return await this.userService.auth(code);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async saveFcmToken(
    @CtxUser() user: User,
    @Args('fcmToken') fcmToken: string,
  ): Promise<User> {
    return await this.userService.saveFcmToken(user, fcmToken);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async allowNotification(@CtxUser() user: User): Promise<User> {
    return await this.userService.allowNotification(user);
  }
}
