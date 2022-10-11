import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService } from './health-check.service';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  getHealthCheck(): 'health Check!' {
    return this.healthCheckService.healthCheck();
  }
}
