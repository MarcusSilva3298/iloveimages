import { Injectable, NotFoundException } from '@nestjs/common';
import { Picture } from '../../Domain/Shared/Entities/Picture';
import { IPictureQuery } from '../../Domain/Shared/Interfaces/IPictureQuery';
import { AwsService } from '../../Infra/Services/aws.service';
import { ImagesServices } from '../../Infra/Services/images.service';
import { LocalService } from '../../Infra/Services/local.service';

@Injectable()
export class GetPictureUsecase {
  constructor(
    private readonly awsService: AwsService,
    private readonly imagesService: ImagesServices,
    private readonly localService: LocalService,
  ) {}

  async execute(key: string, params: IPictureQuery): Promise<Picture> {
    const picture = new Picture(params).setFilename(key);

    const imageExistsInLocal = await this.localService.findImage(
      picture.getRedisKey(),
    );

    if (imageExistsInLocal) {
      console.log('Imagem local');

      picture.setBuffer(imageExistsInLocal);

      return picture;
    }

    console.log('Imagem aws');

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
