import { ApiModule } from '@modules/api.module';
import { Sample } from '@modules/sample/entities';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [Sample],
        synchronize: true,
      }),
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
