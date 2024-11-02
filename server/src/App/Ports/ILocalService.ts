export interface ILocalService {
  findImage(id: string): Promise<Buffer>;
  saveImage(id: string, image: Buffer): Promise<void>;
}
