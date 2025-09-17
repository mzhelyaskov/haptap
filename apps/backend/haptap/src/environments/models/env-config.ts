import { EnvType } from './env-type';

export interface EnvDatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
}

export interface EnvJwtConfig {
  secret: string;
  expiresIn: string;
}

export interface EnvGoogleConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export interface EnvConfig {
  environment: EnvType.DEVELOPMENT | EnvType.PRODUCTION;
  host: string;
  port: number;
  frontendUrl: string;
  oAuthFailureRedirectUrl: string;
  google: EnvGoogleConfig,
  database: EnvDatabaseConfig,
  jwt: EnvJwtConfig
}
