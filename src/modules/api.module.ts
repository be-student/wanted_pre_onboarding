import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { SampleModule } from './sample';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [HealthCheckModule, SampleModule, CompanyModule],
})
export class ApiModule {}
