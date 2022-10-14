import { Body, Controller, Post } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { CreateAnnounce } from './dto/createAnnounce';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}
  @Post()
  async createAnnounce(@Body() createAnnounce: CreateAnnounce) {
    return await this.announceService.create(createAnnounce);
  }
}
