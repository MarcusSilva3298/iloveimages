import { Provider } from '@nestjs/common';
import { PicturesUseCasesEnum } from '../../Domain/Shared/Enums/PicturesUseCasesEnum';
import { AwsService } from '../../Infra/Services/aws.service';
import { ImagesServices } from '../../Infra/Services/images.service';
import { LocalService } from '../../Infra/Services/local.service';
import { IAwsService } from '../Ports/IAwsService';
import { IImagesService } from '../Ports/IImagesService';
import { ILocalService } from '../Ports/ILocalService';
import { GetPictureUsecase } from '../UseCases/GetPictureUseCase';
import { ListPicturesUseCase } from '../UseCases/ListPicturesUseCase';

export const picturesExports: string[] = Object.values(PicturesUseCasesEnum);

export const picturesProviders: Provider[] = [
  {
    provide: PicturesUseCasesEnum.GET_PICTURE_USE_CASE,
    inject: [AwsService, ImagesServices, LocalService],
    useFactory: (
      awsService: IAwsService,
      imagesServices: IImagesService,
      localService: ILocalService,
    ) => new GetPictureUsecase(awsService, imagesServices, localService),
  },
  {
    provide: PicturesUseCasesEnum.LIST_PICTURES_USE_CASE,
    inject: [AwsService],
    useFactory: (awsService: IAwsService) =>
      new ListPicturesUseCase(awsService),
  },
];
