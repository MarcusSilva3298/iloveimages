import { Module, Provider } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ImagesServices } from './images.service';

const services: Provider[] = [AwsService, ImagesServices];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
