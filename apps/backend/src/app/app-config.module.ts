import { APP_CONFIG, ENV_VARIABLES_SCHEMA } from '@app/config';
import { EnvType } from '@app/models/env-type';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `environments/.env.${ process.env.NODE_ENV }`,
        `environments/.env.${ EnvType.DEVELOPMENT }`,
      ],
      load: [() => APP_CONFIG],
      validationSchema: ENV_VARIABLES_SCHEMA,
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useFactory: (): void => {
        throw new Error('ConfigService is deprecated! Use AppConfigService instead.');
      },
    },
  ]
})
export class AppConfigModule {}