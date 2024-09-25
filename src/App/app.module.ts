import { Module } from '@nestjs/common';
import { ServicesModule } from '../Infra/Services/services.module';
import { GetPictureUsecase } from './UseCases/GetPictureUseCase';

@Module({
  imports: [ServicesModule],
  providers: [GetPictureUsecase],
  exports: [GetPictureUsecase],
})
export class AppModule {}
