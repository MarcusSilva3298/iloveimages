export interface ILocalService {
  findImage(filename: string, format: string): Buffer;
  saveImage(image: Buffer, filename: string, format: string): Promise<void>;
}
