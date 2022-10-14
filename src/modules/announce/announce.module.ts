import { Module } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { AnnounceController } from './announce.controller';
import { Announce } from '@typeormEntity/Announce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Announce])],
  controllers: [AnnounceController],
  providers: [AnnounceService],
})
export class AnnounceModule {}
