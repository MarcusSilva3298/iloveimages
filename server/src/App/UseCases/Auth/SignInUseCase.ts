import { UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignResponse';
import { IUseCase } from '../../Ports/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUserRepository';
import { IHashService } from '../../Ports/Services/IHashService';
import { ITokenService } from '../../Ports/Services/ITokenService';

export class SignInUseCase implements IUseCase<ISignResponse, [SignInDto]> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(body: SignInDto): Promise<ISignResponse> {
    const userExists = await this.userRepository.findByEmail(body.email);

    if (!userExists) throw new UnauthorizedException('Invalid credentials!');

    const isPassword = await this.hashService.compareHash(
      body.password,
      userExists.password,
    );

    if (!isPassword) throw new UnauthorizedException('Invalid credentials!');

    const accessToken = this.tokenService.signAccess({ id: userExists.id });

    const refreshToken = this.tokenService.signRefresh({ id: userExists.id });

    delete userExists.password;

    return { accessToken, refreshToken, user: userExists };
  }
}
