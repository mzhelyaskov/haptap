/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DeepPartial, EnvConfig, EnvType } from '../models';
import { getCommonEnv } from './common.config';

export const getProductionAppConfig: () => EnvConfig = () => {
  const common: DeepPartial<EnvConfig> = getCommonEnv()!;
  return {
    environment: EnvType.PRODUCTION,
    host: 'localhost',
    port: 3000,
    frontendUrl: 'http://localhost:4200',
    oAuthFailureRedirectUrl: 'http://localhost:4200/auth/error',
    google: {
      clientId: common.google!.clientId!,
      clientSecret: common.google!.clientSecret!,
      callbackUrl: common.google!.callbackUrl!
    },
    database: {
      type: 'postgres',
      host: common.database!.host!,
      port: common.database!.port!,
      username: common.database!.username!,
      password: common.database!.password!,
      name: common.database!.name!,
      synchronize: false
    },
    jwt: {
      secret: common.jwt!.secret!,
      expiresIn: common.jwt!.expiresIn!
    }
  } as const;
};
