import { IPictureFormatProps } from '../../Domain/Shared/Interfaces/IPictureFormatProps';

export interface IImagesService {
  formatImage(image: Buffer, props: IPictureFormatProps): Promise<Buffer>;
}
