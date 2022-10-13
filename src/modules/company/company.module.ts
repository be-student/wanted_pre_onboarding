import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@typeormEntity/Company.entity';
import { CompanyAdditional } from '@typeormEntity/CompanyAdditional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyAdditional])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
