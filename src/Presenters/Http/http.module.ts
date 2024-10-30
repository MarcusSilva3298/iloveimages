import { Module } from '@nestjs/common';
import { AppModule } from '../../App/app.module';
import { PicturesController } from './Controllers/pictures.controller';
import { UsersController } from './Controllers/users.controller';
import { HttpController } from './http.controller';

@Module({
  imports: [AppModule],
  controllers: [HttpController, PicturesController, UsersController],
})
export class HttpModule {}
