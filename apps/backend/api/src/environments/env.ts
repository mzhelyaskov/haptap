import { Environment, EnvType } from '@@be-api/environments/models';
import { getDevelopmentEnvConfig } from '@@be-api/environments/env.development';
import { getProductionEnvConfig } from '@@be-api/environments/env.production';
import { EnvSchema } from '@@be-api/environments/schemas';
import { z } from 'zod/index';
import { Logger } from '@nestjs/common';

type ZodParseResult = z.SafeParseReturnType<unknown, unknown>;
let envConfig: Environment | undefined;

const envTypeToConfig: Record<EnvType, Environment> = {
  [EnvType.DEVELOPMENT]: getDevelopmentEnvConfig(),
  [EnvType.PRODUCTION]: getProductionEnvConfig(),
};

export function environment(): Environment {
  if (!envConfig) {
    const envName: string = process.env.NODE_ENV || EnvType.DEVELOPMENT;
    envConfig = envTypeToConfig[envName as EnvType];
    const parseResult: ZodParseResult = EnvSchema.safeParse(envConfig);
    if (!parseResult.success) {
      Logger.error('Invalid final environment config:');
      Logger.error(parseResult.error);
      throw new Error('Invalid final EnvConfig');
    }
  }
  return envConfig;
}
