import { IAwsService } from '../Ports/IAwsService';
import { IUseCase } from '../Ports/IUseCase';

export class ListPicturesUseCase implements IUseCase<string[]> {
  constructor(private readonly awsService: IAwsService) {}

  async execute(): Promise<string[]> {
    return await this.awsService.listFiles();
  }
}
