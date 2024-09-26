import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class LocalService {
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

  async saveImage(
    image: Buffer,
    filename: string,
    format: string,
  ): Promise<void> {
    const imagePath = path.resolve(this.bucketPath, `${filename}.${format}`);

    await sharp(image).toFile(imagePath);
  }
}
