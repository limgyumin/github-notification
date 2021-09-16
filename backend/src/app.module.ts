import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionModule } from './modules/contribution.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ContributionModule],
})
export class AppModule {}
