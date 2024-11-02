import { PictureQueryDto } from '../Shared/Dtos/PictureQueryDto';
import { PicturesFormatsEnum } from '../Shared/Enums/PicturesFormatsEnum';
import { IPictureFormatProps } from '../Shared/Interfaces/IPictureFormatProps';
import { User } from './User';

export class Picture {
  readonly id: string;

  public location: string;

  public title: string;
  public tags: string;
  public description: string;

  public User?: User;
  public userId: string;

  private quality: number;
  private format: string;
  private width?: number;
  private height?: number;
  private grayscale: boolean;
  private pictureAsBuffer: Buffer;
  private filename: string;

  constructor(key: string, props: PictureQueryDto) {
    this.quality = props.q || 85;
    this.width = props.w || null;
    this.height = props.h || null;
    this.grayscale = props.gray === '1';

    const [filename, originalFormat] = key.split('.');
    this.filename = filename;
    this.format = this.chooseFormat(originalFormat, props.fm);
  }

  private chooseFormat(
    originalFormat: string,
    requestFormat: string,
  ): string | undefined {
    if (requestFormat) return requestFormat;

    if (this.grayscale && this.quality >= 90)
      return PicturesFormatsEnum.PNG as string;

    if (this.quality < 80 && !this.grayscale)
      return PicturesFormatsEnum.JPG as string;

    if (this.quality >= 80 || this.width * this.height > 1000000)
      return PicturesFormatsEnum.WEBP as string;

    return originalFormat;
  }

  public setBuffer(buffer: Buffer): this {
    this.pictureAsBuffer = buffer;
    return this;
  }

  public getRedisKey(): string {
    return `${this.filename}.${this.format}_${this.quality}_${this.width}_${this.height}_${String(this.grayscale)}`;
  }

  public getProcessProps(): IPictureFormatProps {
    return {
      width: this.width,
      height: this.height,
      format: this.format,
      quality: this.quality,
      grayscale: this.grayscale,
    };
  }

  public getFormat(): string {
    return this.format;
  }

  public getBuffer(): Buffer {
    return this.pictureAsBuffer;
  }

  public getFilename(): string {
    return this.filename;
  }
}
