import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { SampleModule } from './sample';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HealthCheckModule, SampleModule, CompanyModule, UsersModule],
})
export class ApiModule {}
