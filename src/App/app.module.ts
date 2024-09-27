import { Module } from '@nestjs/common';
import { ServicesModule } from '../Infra/Services/services.module';
import {
  picturesExports,
  picturesProviders,
} from './Providers/PicturesUseCasesProviders';

@Module({
  imports: [ServicesModule],
  providers: [...picturesProviders],
  exports: [...picturesExports],
})
export class AppModule {}
