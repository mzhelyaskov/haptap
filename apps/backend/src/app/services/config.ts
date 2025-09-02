import { APP_CONFIG } from '@app/config';
import { AppConfig, AppDatabaseConfig, AppGoogleConfig, AppJwtConfig } from '@app/models/app-config';

export class Config {
  public static readonly database: AppDatabaseConfig = APP_CONFIG.database;
  public static readonly google: AppGoogleConfig = APP_CONFIG.google;
  public static readonly jwt: AppJwtConfig = APP_CONFIG.jwt;
  public static readonly host: string = APP_CONFIG.host;
  public static readonly frontendUrl: string = APP_CONFIG.frontendUrl;

  static get<P extends keyof AppConfig>(property: P): AppConfig[P] {
    return APP_CONFIG[property]!;
  }
}