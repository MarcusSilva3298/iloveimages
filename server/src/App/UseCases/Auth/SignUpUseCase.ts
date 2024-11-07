import { ConflictException } from '@nestjs/common';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignResponse';
import { IUseCase } from '../../Ports/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUserRepository';
import { IHashService } from '../../Ports/Services/IHashService';
import { ITokenService } from '../../Ports/Services/ITokenService';

export class SignUpUseCase
  implements IUseCase<ISignResponse, [UserFactoryDto]>
{
  constructor(
    private readonly usersRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(body: UserFactoryDto): Promise<ISignResponse> {
    if (await this.usersRepository.findByEmail(body.email))
      throw new ConflictException('Email already in use!');

    if (await this.usersRepository.findByAlias(body.alias))
      throw new ConflictException('Alias already in use!');

    const hashedPassword = await this.hashService.hashPassword(body.password);

    const createdUser = await this.usersRepository.create({
      ...body,
      password: hashedPassword,
    });

    const accessToken = this.tokenService.signAccess({ id: createdUser.id });

    const refreshToken = this.tokenService.signRefresh({ id: createdUser.id });

    delete createdUser.password;

    return { accessToken, refreshToken, user: createdUser };
  }
}
