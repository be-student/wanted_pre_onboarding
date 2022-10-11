import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async create() {
    return await this.sampleService.create();
  }

  @Get()
  async findAll() {
    return await this.sampleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sampleService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sampleService.remove(+id);
  }
}
