import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { Readable } from 'stream';
import { IPictureFormatProps } from '../../Domain/Shared/Interfaces/IPictureFormatProps';

@Injectable()
export class ImagesServices {
  async bufferizeImage(image: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      image.on('data', (chunk) => chunks.push(chunk));
      image.on('end', () => resolve(Buffer.concat(chunks)));
      image.on('error', reject);
    });
  }

  async formatImage(
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
