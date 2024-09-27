import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ILocalService } from '../../App/Ports/ILocalService';

@Injectable()
export class LocalService implements ILocalService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
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
    await this.redis.set(id, image, 'EX', 50000);
  }
}
