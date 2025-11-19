/* eslint-disable @typescript-eslint/no-non-null-assertion */
import process from 'node:process';
import { CommonEnvConfig } from '@@be-api/environments/models/common-env-config';

export function getCommonEnvConfig(): CommonEnvConfig {
  return {
    google: {
      callbackUrl: process.env.GOOGLE_CALLBACK_URL!,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    database: {
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10)!,
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      name: process.env.DB_NAME!
    },
    jwt: {
      secret: process.env.JWT_SECRET!,
    },
  } as const;
}
