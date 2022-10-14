import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { CreateAnnounce } from './dto/createAnnounce';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}
  @Post()
  async createAnnounce(@Body() createAnnounce: CreateAnnounce) {
    return await this.announceService.create(createAnnounce);
  }

  @Delete('/:id')
  async deleteAnnounce(@Param('id') id: string) {
    return await this.announceService.delete(id);
  }
}
