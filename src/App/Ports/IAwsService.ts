import { Readable } from 'stream';

export interface IAwsService {
  getFile(key: string): Promise<Readable>;
}
