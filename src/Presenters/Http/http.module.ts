import { Module } from '@nestjs/common';
import { AppModule } from '../../App/app.module';
import { HttpController } from './http.controller';

@Module({
  imports: [AppModule],
  controllers: [HttpController],
})
export class HttpModule {}
