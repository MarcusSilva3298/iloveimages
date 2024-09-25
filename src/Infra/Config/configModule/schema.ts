import { Expose } from 'class-transformer';
import * as Joi from 'joi';

export class EnvClass {
  @Expose()
  ACCESS_KEY_ID: string;

  @Expose()
  ACCESS_KEY_SECRET: string;

  @Expose()
  AWS_REGION: string;

  @Expose()
  AWS_BUCKET_NAME: string;

  @Expose()
  ENVIROMENT: string;

  @Expose()
  VERSION: string;
}

export const envSchema = Joi.object<EnvClass>({
  ACCESS_KEY_ID: Joi.string().required(),
  ACCESS_KEY_SECRET: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
  ENVIROMENT: Joi.string().required(),
  VERSION: Joi.string().required(),
});
