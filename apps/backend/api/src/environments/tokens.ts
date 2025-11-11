import { InjectionToken } from '@nestjs/common';
import { EnvConfig } from './models';

export const ENV_CONFIG: InjectionToken<EnvConfig> = 'ENV_CONFIG';
