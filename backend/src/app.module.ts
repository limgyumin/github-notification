import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserModule } from './modules/user.module';
import { ContributionModule } from './modules/contribution.module';
import { ScheduleLib } from './utils/libs/schedule.lib';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    ContributionModule,
  ],
  providers: [ScheduleLib],
})
export class AppModule {}
