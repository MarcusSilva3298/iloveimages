import { NotFoundException } from '@nestjs/common';
import { Picture } from '../../Domain/Entities/Picture';
import { PictureQueryDto } from '../../Domain/Shared/Dtos/PictureQueryDto';
import { IAwsService } from '../Ports/IAwsService';
import { IImagesService } from '../Ports/IImagesService';
import { ILocalService } from '../Ports/ILocalService';
import { IUseCase } from '../Ports/IUseCase';

export class GetPictureUsecase
  implements IUseCase<Picture, [string, PictureQueryDto]>
{
  constructor(
    private readonly awsService: IAwsService,
    private readonly imagesService: IImagesService,
    private readonly localService: ILocalService,
  ) {}

  async execute(key: string, params: PictureQueryDto): Promise<Picture> {
    const picture = new Picture(key, params);

    const imageExistsInLocal = await this.localService.findImage(
      picture.getRedisKey(),
    );

    if (imageExistsInLocal) {
      picture.setBuffer(imageExistsInLocal);

      return picture;
    }

    const originalImage = await this.awsService.getImage(key);

    if (!originalImage) throw new NotFoundException('Picture not found!');

    const processedImage = await this.imagesService.processImage(
      originalImage,
      picture.getProcessProps(),
    );

    this.localService.saveImage(picture.getRedisKey(), processedImage);

    picture.setBuffer(processedImage);

    return picture;
  }
}
