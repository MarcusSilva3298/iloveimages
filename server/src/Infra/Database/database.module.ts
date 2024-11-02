import { Module, Provider } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PicturesRepository } from './repositories/pictures.repository';
import { UsersRepository } from './repositories/users.repository';

const repositories: Provider[] = [UsersRepository, PicturesRepository];

@Module({ providers: [PrismaService, ...repositories], exports: repositories })
export class DatabaseModule {}
