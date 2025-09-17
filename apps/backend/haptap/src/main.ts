import { AppModule } from '@@be-haptap/app/app.module';
import { ENV_CONFIG, EnvConfig } from '@@be-haptap/environments';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

(async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config: EnvConfig = app.get(ENV_CONFIG);
  await app.listen(config.port, config.host);

  Logger.log(`🚀 Application is running on: ${config.host}:${config.port}/`);
})();
