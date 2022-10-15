import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { createApplication } from './dto/createApplication';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async application(@Body() createApplication: createApplication) {
    return await this.applicationService.create(createApplication);
  }
}
