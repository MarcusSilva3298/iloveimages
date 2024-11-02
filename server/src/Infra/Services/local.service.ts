import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ILocalService } from '../../App/Ports/ILocalService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';

@Injectable()
export class LocalService implements ILocalService {
  private readonly redis: Redis;
  private readonly redisTtlKey = 'EX';

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      host: configService.get<string>(EnvVariablesEnum.CACHE_DB_HOST),
      port: configService.get<number>(EnvVariablesEnum.CACHE_DB_PORT),
    }).on('error', (err) => {
      Logger.error(err, 'RedisService');
      Logger.fatal('Encerrando serviço');

      process.exit(1);
    });
  }

  async findImage(id: string): Promise<Buffer> {
    return await this.redis.getBuffer(id);
  }

  async saveImage(id: string, image: Buffer): Promise<void> {
    await this.redis.set(
      id,
      image,
      this.redisTtlKey,
      this.configService.get<number>(EnvVariablesEnum.CACHE_TTL),
    );
  }
}
