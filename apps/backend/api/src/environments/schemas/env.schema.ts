import { z } from 'zod';
import { EnvType } from '@@be-api/environments/models';

export const EnvSchema: z.AnyZodObject = z.object({
  environment: z.nativeEnum(EnvType),
  host: z.string().min(1),
  port: z.number().int().positive(),
  frontendUrl: z.string().url(),
  oAuthFailureRedirectUrl: z.string().url(),

  google: z.object({
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
    callbackUrl: z.string().url(),
  }),

  database: z.object({
    type: z.literal('postgres'),
    host: z.string().min(1),
    port: z.number().int().positive(),
    username: z.string().min(1),
    password: z.string().min(1),
    name: z.string().min(1),
    synchronize: z.boolean().optional(),
  }),

  jwt: z.object({
    secret: z.string().min(1),
    expiresIn: z.string().optional(),
  })
});
