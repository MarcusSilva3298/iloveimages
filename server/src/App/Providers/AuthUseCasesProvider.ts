import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetMeUseCase } from 'src/App/UseCases/Auth/GetMeUseCase';
import { AuthUseCasesEnum } from '../../Domain/Shared/Enums/AuthUseCasesEnum';
import { UsersRepository } from '../../Infra/Database/repositories/users.repository';
import { HashService } from '../../Infra/Services/hash.service';
import { TokenService } from '../../Infra/Services/token.service';
import { IUserRepository } from '../Ports/Repositories/IUserRepository';
import { IHashService } from '../Ports/Services/IHashService';
import { ITokenService } from '../Ports/Services/ITokenService';
import { SignInUseCase } from '../UseCases/Auth/SignInUseCase';
import { SignUpUseCase } from '../UseCases/Auth/SignUpUseCase';

export const authExports: string[] = Object.values(AuthUseCasesEnum);

export const authProviders: Provider[] = [
  {
    provide: AuthUseCasesEnum.SIGN_IN,
    inject: [UsersRepository, HashService, TokenService, ConfigService],
    useFactory: (
      usersRepository: IUserRepository,
      hashService: IHashService,
      tokenSerice: ITokenService,
    ) => new SignInUseCase(usersRepository, hashService, tokenSerice),
  },
  {
    provide: AuthUseCasesEnum.SIGN_UP,
    inject: [UsersRepository, HashService, TokenService, ConfigService],
    useFactory: (
      usersRepository: IUserRepository,
      hashService: IHashService,
      tokenSerice: ITokenService,
    ) => new SignUpUseCase(usersRepository, hashService, tokenSerice),
  },
  {
    provide: AuthUseCasesEnum.GET_ME,
    inject: [UsersRepository],
    useFactory: (usersRepository: IUserRepository) =>
      new GetMeUseCase(usersRepository),
  },
];
