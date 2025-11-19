import { z } from 'zod';
import { EnvSchema } from '@@be-api/environments/schemas';

export type Environment = z.infer<typeof EnvSchema>;