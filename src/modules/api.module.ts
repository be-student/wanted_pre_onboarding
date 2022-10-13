import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { SampleModule } from './sample';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';
import { AnnounceModule } from './announce/announce.module';

@Module({
  imports: [HealthCheckModule, SampleModule, CompanyModule, UsersModule, AnnounceModule],
})
export class ApiModule {}
