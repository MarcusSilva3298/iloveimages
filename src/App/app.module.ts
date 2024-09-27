import { Module } from '@nestjs/common';
import { ServicesModule } from '../Infra/Services/services.module';
import { GetPictureUsecase } from './UseCases/GetPictureUseCase';
import { ListPicturesUseCase } from './UseCases/ListPicturesUseCase';

@Module({
  imports: [ServicesModule],
  providers: [GetPictureUsecase, ListPicturesUseCase],
  exports: [GetPictureUsecase, ListPicturesUseCase],
})
export class AppModule {}
