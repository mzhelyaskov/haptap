import { EnvType } from '@app/models/env-type';
import { ObjectSchema } from 'joi';
import * as Joi from 'joi';

export const ENV_VARIABLES_SCHEMA: ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid(EnvType.DEVELOPMENT, EnvType.PRODUCTION).required(),
  PORT: Joi.number().default(3000),
  HOST: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().required(),

  GOOGLE_CALLBACK_URL: Joi.string().uri().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5433),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.boolean().truthy('true').falsy('false').default(false),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('3600s'),
});