import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { ILocalService } from '../../App/Ports/ILocalService';

@Injectable()
export class LocalService implements ILocalService {
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

  findImage(filename: string, format: string): Buffer {
    const imagePath = path.resolve(this.bucketPath, `${filename}.${format}`);

    if (!existsSync(imagePath)) return null;
    return readFileSync(imagePath);
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
