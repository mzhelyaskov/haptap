import { Logger } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Config } from '@app/services/config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config: Config = app.get(Config);

  const port: number = config.get('port');
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}
bootstrap();
