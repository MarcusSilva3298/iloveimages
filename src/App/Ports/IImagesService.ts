import { Readable } from 'stream';
import { IPictureFormatProps } from '../../Domain/Shared/Interfaces/IPictureFormatProps';

export interface IImagesService {
  bufferizeImage(image: Readable): Promise<Buffer>;
  formatImage(image: Buffer, props: IPictureFormatProps): Promise<Buffer>;
}
