import { Module } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { AnnounceController } from './announce.controller';
import { Announce } from '@typeormEntity/Announce.entity';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceAdditional } from '@typeormEntity/AnnounceAdditional.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Announce, AnnounceAdditional])],
  controllers: [AnnounceController],
  providers: [AnnounceService],
})
export class AnnounceModule {
  constructor(@InjectDataSource() private datasource: DataSource) {}
}