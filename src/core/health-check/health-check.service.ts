import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  healthCheck(): 'health Check!' {
    return 'health Check!';
  }
}
