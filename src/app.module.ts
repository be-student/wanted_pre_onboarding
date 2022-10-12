import { ApiModule } from '@modules/api.module';
import { Sample } from '@modules/sample/entities';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { AnnounceAdditional } from '@typeormEntity/AnnounceAdditional.entity';
import { Company } from '@typeormEntity/Company.entity';
import { CompanyAdditional } from '@typeormEntity/CompanyAdditional.entity';
import { Tech } from '@typeormEntity/Tech.entity';
import { User } from '@typeormEntity/User.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DBHOST'),
        port: configService.get('DBPORT'),
        username: configService.get('DBUSERNAME'),
        password: configService.get('DBPASSWORD'),
        database: configService.get('DBDATABASE'),
        entities: [
          Announce,
          AnnounceAdditional,
          Company,
          CompanyAdditional,
          Tech,
          User,
        ],
        synchronize: false,
      }),
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
