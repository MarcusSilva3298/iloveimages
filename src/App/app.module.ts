import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Infra/Database/database.module';
import { ServicesModule } from '../Infra/Services/services.module';
import { authExports, authProviders } from './Providers/AuthUseCasesProvider';
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
  providers: [...picturesProviders, ...usersProviders, ...authProviders],
  exports: [...picturesExports, ...usersExports, ...authExports],
})
export class AppModule {}
