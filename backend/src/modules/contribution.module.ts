import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionRepository } from 'src/repositories/contribution.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionRepository])],
})
export class ContributionModule {}
