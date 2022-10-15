import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { CreateAnnounce } from './dto/createAnnounceDto';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}
  @Post()
  async createAnnounce(@Body() createAnnounce: CreateAnnounce) {
    return await this.announceService.create(createAnnounce);
  }

  @Put('/:id')
  async updateAnnounce(
    @Body() updateAnnounce: CreateAnnounce,
    @Param('id') id: string,
  ) {
    return await this.announceService.update(updateAnnounce, id);
  }

  @Delete('/:id')
  async deleteAnnounce(@Param('id') id: string) {
    return await this.announceService.delete(id);
  }

  @Get()
  async getAnnounce(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ) {
    return await this.announceService.findByPage(page, search);
  }

  @Get('/:id')
  async getSpecific(@Param('id', ParseIntPipe) id: number) {
    return await this.announceService.findById(id);
  }
}
