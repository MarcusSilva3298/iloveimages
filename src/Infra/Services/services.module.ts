import { Module, Provider } from '@nestjs/common';
import { AwsService } from './aws.service';
import { HashService } from './hash.service';
import { ImagesServices } from './images.service';
import { LocalService } from './local.service';
import { TokenService } from './token.service';

const services: Provider[] = [
  AwsService,
  ImagesServices,
  LocalService,
  HashService,
  TokenService,
];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
