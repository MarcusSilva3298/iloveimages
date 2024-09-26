import { Injectable } from '@nestjs/common';
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

    const getImageAws = await this.awsService.getFile(key);

    picture.setBuffer(await this.imagesService.bufferizeImage(getImageAws));

    await this.localService.saveImage(
      picture.getBuffer(),
      picture.getFilename(),
      picture.getFormat(),
    );

    picture.setBuffer(
      await this.imagesService.formatImage(
        picture.getBuffer(),
        picture.getFormatProps(),
      ),
    );

    return picture;
  }
}
