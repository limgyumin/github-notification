import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { CtxUser } from 'src/utils/decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/utils/guards/ctx-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUser(@CtxUser() user: User) {
    return user;
  }

  @Mutation(() => String)
  async auth(@Args('code') code: string): Promise<string> {
    return await this.userService.auth(code);
  }
}
