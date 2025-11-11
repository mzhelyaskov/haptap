import {
  ENV_CONFIG,
  envSchema,
  EnvType,
  loadEnvConfig,
} from '@@be-api/environments';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(__dirname, `environments/.env.${process.env.NODE_ENV}`),
        path.resolve(__dirname, `environments/.env.${EnvType.DEVELOPMENT}`)
      ],
      load: [() => loadEnvConfig()],
      validationSchema: envSchema,
    }),
  ],
  providers: [{ provide: ENV_CONFIG, useFactory: () => loadEnvConfig() }],
  exports: [ENV_CONFIG, ConfigModule],
})
export class AppConfigModule {}
