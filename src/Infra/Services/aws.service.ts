import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { IAwsService } from '../../App/Ports/IAwsService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';

@Injectable()
export class AwsService implements IAwsService {
  private readonly bucketName: string;
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>(
      EnvVariablesEnum.AWS_BUCKET_NAME,
    );

    this.s3Client = new S3Client({
      region: this.configService.get<string>(EnvVariablesEnum.AWS_REGION),
      credentials: {
        accessKeyId: this.configService.get<string>(
          EnvVariablesEnum.ACCESS_KEY_ID,
        ),
        secretAccessKey: this.configService.get<string>(
          EnvVariablesEnum.ACCESS_KEY_SECRET,
        ),
      },
    });
  }

  async listFiles() {
    const listCommand = new ListObjectsV2Command({
      Bucket: this.bucketName,
    });

    const listResponse = await this.s3Client.send(listCommand);

    console.log(listResponse.Contents);
  }

  async getFile(key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    return response.Body as Readable;
  }
}
