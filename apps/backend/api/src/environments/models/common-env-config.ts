export interface CommonEnvDatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface CommonEnvJwtConfig {
  secret: string;
}

export interface CommonEnvGoogleConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export interface CommonEnvConfig {
  google: CommonEnvGoogleConfig,
  database: CommonEnvDatabaseConfig,
  jwt: CommonEnvJwtConfig
}
