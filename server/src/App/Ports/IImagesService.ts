import { IPictureFormatProps } from '../../Domain/Shared/Interfaces/IPictureFormatProps';

export interface IImagesService {
  processImage(image: Buffer, props: IPictureFormatProps): Promise<Buffer>;
}
