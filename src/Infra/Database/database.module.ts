import { Module, Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersRepository } from './repositories/users.repository';
import { PicturesRepository } from './repositories/pictures.repository';

const repositories: Provider[] = [UsersRepository, PicturesRepository];

@Module({ providers: [PrismaClient, ...repositories], exports: repositories })
export class DatabaseModule {}
