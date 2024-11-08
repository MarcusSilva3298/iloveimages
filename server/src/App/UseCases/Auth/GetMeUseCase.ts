import { NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/App/Ports/IUseCase';
import { IUserRepository } from 'src/App/Ports/Repositories/IUserRepository';
import { User } from 'src/Domain/Entities/User';

export class GetMeUseCase implements IUseCase<User, [string]> {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new NotFoundException('User not found!');

    return userExists;
  }
}
