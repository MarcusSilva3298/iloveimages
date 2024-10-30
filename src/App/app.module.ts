import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Infra/Database/database.module';
import { ServicesModule } from '../Infra/Services/services.module';
import {
  picturesExports,
  picturesProviders,
} from './Providers/PicturesUseCasesProviders';
import {
  usersExports,
  usersProviders,
} from './Providers/UsersUseCasesProviders';

@Module({
  imports: [ServicesModule, DatabaseModule],
  providers: [...picturesProviders, ...usersProviders],
  exports: [...picturesExports, ...usersExports],
})
export class AppModule {}
