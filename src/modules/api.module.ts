import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { SampleModule } from './sample';

@Module({
  imports: [HealthCheckModule, SampleModule],
})
export class ApiModule {}
