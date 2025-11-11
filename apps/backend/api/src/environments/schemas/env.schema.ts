import { ObjectSchema } from 'joi';
import * as Joi from 'joi';
import { EnvType } from '../models';

export const envSchema: ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid(EnvType.DEVELOPMENT, EnvType.PRODUCTION).required(),

  GOOGLE_CALLBACK_URL: Joi.string().uri().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5433),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  JWT_SECRET: Joi.string().required()
});
