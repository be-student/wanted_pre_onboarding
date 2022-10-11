import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
