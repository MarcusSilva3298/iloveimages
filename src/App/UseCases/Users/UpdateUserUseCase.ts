import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../../Domain/Entities/User';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { IUseCase } from '../../Ports/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUserRepository';
import { IHashService } from '../../Ports/Services/IHashService';

export class UpdateUserUseCase
  implements IUseCase<User, [string, UserFactoryDto]>
{
  constructor(
    private readonly usersRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(id: string, body: UserFactoryDto): Promise<User> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new NotFoundException('User not found!');

    const emailInUse = await this.usersRepository.findByEmail(body.email);

    if (emailInUse && emailInUse.id !== userExists.id)
      throw new ConflictException('Email already in use!');

    const aliasInUse = await this.usersRepository.findByAlias(body.alias);

    if (aliasInUse && aliasInUse.id !== userExists.id)
      throw new ConflictException('Email already in use!');

    const newHashedPassword = await this.hashService.hashPassword(
      body.password,
    );

    return this.usersRepository.update(id, {
      ...body,
      password: newHashedPassword,
    });
  }
}
