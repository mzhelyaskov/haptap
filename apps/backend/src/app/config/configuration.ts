import { AppConfig } from '@app/models/app-config';
import { EnvType } from '@app/models/env-type';
import * as process from 'node:process';

export const APP_CONFIG: AppConfig = {
  environment: process.env.NODE_ENV || EnvType.DEVELOPMENT,
  port: parseInt(process.env.PORT!, 10) || 3000,
  host: process.env.HOST!,
  frontendUrl: process.env.FRONTEND_URL!,
  google: {
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    name: process.env.DB_NAME!,
    synchronize: process.env.DB_SYNC === 'true'
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s'
  }
} as const;