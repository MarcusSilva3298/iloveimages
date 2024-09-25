import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SoruceModule } from './source.module';

async function bootstrap() {
  const app = await NestFactory.create(SoruceModule);
  await app.listen(3000, () => Logger.verbose('Serviço online na porta 3000!'));
}
bootstrap();
