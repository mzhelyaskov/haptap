import { getCommonEnvConfig } from './env.common';
import { Environment, EnvType } from '@@be-api/environments/models';
import { CommonEnvConfig } from '@@be-api/environments/models/common-env-config';

export function getProductionEnvConfig(): Environment {
  const common: CommonEnvConfig = getCommonEnvConfig();
  return {
    environment: EnvType.PRODUCTION,
    host: 'localhost',
    port: 3000,
    frontendUrl: 'http://localhost:4200',
    oAuthFailureRedirectUrl: 'http://localhost:4200/auth/error',
    google: {
      clientId: common.google.clientId,
      clientSecret: common.google.clientSecret,
      callbackUrl: common.google.callbackUrl
    },
    database: {
      type: 'postgres',
      host: common.database.host,
      port: common.database.port,
      username: common.database.username,
      password: common.database.password,
      name: common.database.name,
      synchronize: false
    },
    jwt: {
      secret: common.jwt.secret,
      expiresIn: '1h'
    }
  } as const;
}
