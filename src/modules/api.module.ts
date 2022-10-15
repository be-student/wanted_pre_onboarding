import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';
import { AnnounceModule } from './announce/announce.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    HealthCheckModule,
    CompanyModule,
    UsersModule,
    AnnounceModule,
    ApplicationModule,
  ],
})
export class ApiModule {}
