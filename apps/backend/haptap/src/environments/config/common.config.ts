/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { EnvConfig, DeepPartial } from '../models';
import process from 'node:process';

export const getCommonEnv: () => DeepPartial<EnvConfig> = () => {
  return {
    google: {
      callbackUrl: process.env.GOOGLE_CALLBACK_URL!,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    },
    database: {
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10) || 5432,
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      name: process.env.DB_NAME!
    },
    jwt: {
      secret: process.env.JWT_SECRET!
    }
  } as const;
};
