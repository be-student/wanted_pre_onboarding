import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import * as cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { setupSwagger } from './core/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api', { exclude: ['docs'] });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  setupSwagger(app);

  app.enableCors();

  // app.use(cookieParser());
  const configService = app.get(ConfigService);
  Sentry.init({ dsn: configService.get<string>('SENTRY_DSN') });
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port, () => {
    console.log(`SERVER LISTENING ON port ${port}`);
  });
}
bootstrap();
