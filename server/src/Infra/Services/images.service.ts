import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { IImagesService } from '../../App/Ports/IImagesService';
import { IPictureFormatProps } from '../../Domain/Shared/Interfaces/IPictureFormatProps';

@Injectable()
export class ImagesServices implements IImagesService {
  async processImage(
    image: Buffer,
    props: IPictureFormatProps,
  ): Promise<Buffer> {
    return sharp(image)
      .resize(props.width, props.height)
      .grayscale(props.grayscale)
      .toFormat(props.format as keyof sharp.FormatEnum, {
        quality: props.quality,
      })
      .toBuffer();
  }
}
