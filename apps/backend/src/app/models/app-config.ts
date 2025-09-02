export interface AppDatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
}

export interface AppJwtConfig {
  secret: string;
  expiresIn: string;
}

export interface AppGoogleConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export interface AppConfig {
  environment: string;
  port: number;
  host: string;
  frontendUrl: string;
  google: AppGoogleConfig;
  database: AppDatabaseConfig;
  jwt: AppJwtConfig;
}