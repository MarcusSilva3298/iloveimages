import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SoruceModule } from './source.module';

async function bootstrap() {
  const app = await NestFactory.create(SoruceModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000, () => Logger.verbose('Serviço online na porta 3000!'));
}
bootstrap();
