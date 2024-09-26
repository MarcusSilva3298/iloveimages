import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Readable } from 'stream';
import { IPictureFormatProps } from '../../Domain/Shared/Interfaces/IPictureFormatProps';

@Injectable()
export class ImagesServices {
  private readonly bucketPath: string = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'bucket',
    'pictures',
  );

  constructor() {
    if (!existsSync(this.bucketPath))
      mkdirSync(this.bucketPath, { recursive: true });
  }

  async bufferizeImage(image: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      image.on('data', (chunk) => chunks.push(chunk));
      image.on('end', () => resolve(Buffer.concat(chunks)));
      image.on('error', reject);
    });
  }

  async saveImage(
    image: Buffer,
    filename: string,
    format: string,
  ): Promise<void> {
    const imagePath = path.resolve(this.bucketPath, `${filename}.${format}`);

    await sharp(image).toFile(imagePath);
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
