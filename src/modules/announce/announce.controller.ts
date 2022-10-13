import { Controller } from '@nestjs/common';
import { AnnounceService } from './announce.service';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}
}
