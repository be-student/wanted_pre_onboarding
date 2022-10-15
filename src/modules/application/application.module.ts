import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@typeormEntity/User.entity';
import { Announce } from '@typeormEntity/Announce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Announce])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
