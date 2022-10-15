import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplication } from './dto/createApplication';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async application(@Body() createApplication: CreateApplication) {
    return await this.applicationService.create(createApplication);
  }
}
