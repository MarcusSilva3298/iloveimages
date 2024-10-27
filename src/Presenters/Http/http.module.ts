import { Module } from '@nestjs/common';
import { AppModule } from '../../App/app.module';
import { HttpController } from './http.controller';
import { PicturesController } from './Controllers/pictures.controller';

@Module({
  imports: [AppModule],
  controllers: [HttpController, PicturesController],
})
export class HttpModule {}
