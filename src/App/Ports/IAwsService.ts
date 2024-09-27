export interface IAwsService {
  getImage(key: string): Promise<Buffer>;
  listFiles(): Promise<string[]>;
}
