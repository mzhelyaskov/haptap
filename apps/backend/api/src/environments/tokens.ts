import { InjectionToken } from '@nestjs/common';
import { Environment } from './models';

export const ENV: InjectionToken<Environment> = 'ENV';
