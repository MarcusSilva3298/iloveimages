import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './Presenters/Http/Filters/http-exception.filter';
import { SoruceModule } from './source.module';

async function bootstrap() {
  const app = await NestFactory.create(SoruceModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000, () => Logger.verbose('Serviço online na porta 3000!'));
}
bootstrap();
