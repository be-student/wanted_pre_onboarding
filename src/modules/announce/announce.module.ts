import { Module } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { AnnounceController } from './announce.controller';

@Module({
  controllers: [AnnounceController],
  providers: [AnnounceService]
})
export class AnnounceModule {}
