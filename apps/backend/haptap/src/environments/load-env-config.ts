import { getDevelopmentAppConfig, getProductionAppConfig } from './config';
import { EnvConfig, EnvType } from './models';

let config: EnvConfig | undefined;

const envConfigurations: Record<EnvType, () => EnvConfig> = {
  [EnvType.DEVELOPMENT]: getDevelopmentAppConfig,
  [EnvType.PRODUCTION]: getProductionAppConfig
};

export const loadEnvConfig: () => EnvConfig = (): EnvConfig => {
  if (config) {
    return config;
  }
  config = envConfigurations[process.env.NODE_ENV as EnvType]();
  return config || envConfigurations[EnvType.PRODUCTION]();
};
