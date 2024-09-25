import { Injectable } from '@nestjs/common';
import { PictureQueryDto } from '../../Domain/Shared/Dtos/PictureQueryDto';
import { IPictureQuery } from '../../Domain/Shared/Interfaces/IPictureQuery';
import { AwsService } from '../../Infra/Services/aws.service';

@Injectable()
export class GetPictureUsecase {
  constructor(private readonly awsService: AwsService) {}

  async execute(key: string, params: IPictureQuery): Promise<any> {
    const parsedParams = new PictureQueryDto(params);

    return this.awsService.getFile(key);
  }
}
