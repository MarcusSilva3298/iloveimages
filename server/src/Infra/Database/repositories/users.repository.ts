import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../App/Ports/Repositories/IUserRepository';
import { User } from '../../../Domain/Entities/User';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(params: UserFactoryDto): Promise<User> {
    return this.prisma.user.create({
      data: params,
    });
  }

  update(id: string, params: UserFactoryDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: params,
    });
  }

  findByAlias(alias: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { alias, deletedAt: null } });
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email, deletedAt: null } });
  }

  findById(id: string, includeDeleted: boolean = false): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id, deletedAt: !includeDeleted ? null : undefined },
    });
  }

  async softDelete(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const now = new Date();
    const nowAsString = now.toISOString();

    user.alias = user.alias.concat(`-${nowAsString}`);
    user.email = user.email.concat(`-${nowAsString}`);
    user.deletedAt = now;

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }
}
