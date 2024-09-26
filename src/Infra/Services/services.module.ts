import { Module, Provider } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ImagesServices } from './images.service';
import { LocalService } from './local.service';

const services: Provider[] = [AwsService, ImagesServices, LocalService];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
