import { Injectable } from '@nestjs/common';
import { AwsService } from '../../Infra/Services/aws.service';

@Injectable()
export class ListPicturesUseCase {
  constructor(private readonly awsService: AwsService) {}

  async execute(): Promise<string[]> {
    return await this.awsService.listFiles();
  }
}
