import { ConflictException } from '@nestjs/common';
import { User } from '../../../Domain/Entities/User';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { IUseCase } from '../../Ports/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUserRepository';
import { IHashService } from '../../Ports/Services/IHashService';

export class CreateUserUseCase implements IUseCase<User, [UserFactoryDto]> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(body: UserFactoryDto): Promise<User> {
    if (await this.userRepository.findByEmail(body.email))
      throw new ConflictException('Email already in use!');

    if (await this.userRepository.findByAlias(body.alias))
      throw new ConflictException('Alias already in use!');

    const hashedPassword = await this.hashService.hashPassword(body.password);

    return this.userRepository.create({ ...body, password: hashedPassword });
  }
}
