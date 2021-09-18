import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserResolver } from 'src/resolvers/user.resolver';

import { ContributionModule } from './contribution.module';

import { GitHubLib } from 'src/utils/libs/github.lib';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { GqlAuthGuard } from 'src/utils/guards/ctx-auth.guard';

import config from '../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    ContributionModule,
  ],
  exports: [UserService],
  providers: [UserService, UserResolver, GitHubLib, JwtStrategy, GqlAuthGuard],
})
export class UserModule {}
