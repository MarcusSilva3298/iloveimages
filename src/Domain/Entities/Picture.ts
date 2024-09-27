import { IPictureFormatProps } from '../Shared/Interfaces/IPictureFormatProps';
import { IPictureQuery } from '../Shared/Interfaces/IPictureQuery';

export class Picture {
  private quality: number;
  private format: string;
  private width?: number;
  private heigth?: number;
  private grayscale: boolean;
  private pictureAsBuffer: Buffer;
  private filename: string;

  constructor(props: IPictureQuery) {
    this.quality = Number(props.q) || 85;
    this.format = props.fm || undefined;
    this.width = Number(props.w) || null;
    this.heigth = Number(props.h) || null;
    this.grayscale = props.gray === '1';
  }

  public setFilename(key: string): this {
    const [filename, format] = key.split('.');
    this.filename = filename;
    this.format = this.format || format;
    return this;
  }

  public setBuffer(buffer: Buffer): this {
    this.pictureAsBuffer = buffer;
    return this;
  }

  public getRedisKey(): string {
    return `${this.filename}.${this.format}_${this.quality}_${this.width}_${this.heigth}_${String(this.grayscale)}`;
  }

  public getProcessProps(): IPictureFormatProps {
    return {
      width: this.width,
      height: this.heigth,
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
