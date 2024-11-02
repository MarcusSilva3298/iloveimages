import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EnvClass, envSchema } from './schema';

export function validateEnvVariables(options: Record<string, any>) {
  const parsedOptions = plainToClass(EnvClass, options, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const result = envSchema.validate(parsedOptions, {
    abortEarly: false,
    allowUnknown: false,
    convert: true,
  });

  if (result.error) {
    result.error.details.forEach(({ message }) => {
      Logger.error(message, 'ENV VARIABLES ERROR');
    });
    Logger.fatal('Fechando servidor');
    process.exit(1);
  }

  return parsedOptions;
}
