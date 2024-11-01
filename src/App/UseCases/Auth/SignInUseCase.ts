import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { EnvVariablesEnum } from '../../../Domain/Shared/Enums/EnvVariablesEnum';
import { ISignInResponse } from '../../../Domain/Shared/Interfaces/ISignInResponse';
import { IUseCase } from '../../Ports/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUserRepository';
import { IHashService } from '../../Ports/Services/IHashService';
import { ITokenService } from '../../Ports/Services/ITokenService';

export class SignInUseCase implements IUseCase<ISignInResponse, [SignInDto]> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService,
    private readonly configService: ConfigService,
  ) {}

  async execute(body: SignInDto): Promise<ISignInResponse> {
    const userExists = await this.userRepository.findByEmail(body.email);

    if (!userExists) throw new UnauthorizedException('Invalid credentials!');

    const isPassword = await this.hashService.compareHash(
      body.password,
      userExists.password,
    );

    if (!isPassword) throw new UnauthorizedException('Invalid credentials!');

    const accessToken = this.tokenService.sign(
      { id: userExists.id },
      this.configService.get(EnvVariablesEnum.TOKEN_SECRET),
      { expiresIn: this.configService.get(EnvVariablesEnum.TOKEN_EXPIRES_IN) },
    );

    const refreshToken = this.tokenService.sign(
      { id: userExists.id },
      this.configService.get(EnvVariablesEnum.REFRESH_SECRET),
      {
        expiresIn: this.configService.get(EnvVariablesEnum.REFRESH_EXPIRES_IN),
      },
    );

    return { accessToken, refreshToken };
  }
}
