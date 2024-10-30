import { NotFoundException } from '@nestjs/common';
import { User } from '../../../Domain/Entities/User';
import { IUseCase } from '../../Ports/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUserRepository';

export class GetUserUseCase implements IUseCase<User, [string]> {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const userFound = await this.usersRepository.findById(id, true);

    if (!userFound) throw new NotFoundException('User not found!');

    return userFound;
  }
}
