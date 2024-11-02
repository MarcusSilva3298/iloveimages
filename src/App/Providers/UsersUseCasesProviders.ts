import { Provider } from '@nestjs/common';
import { UsersUseCasesEnum } from '../../Domain/Shared/Enums/UsersUseCasesEnum';
import { UsersRepository } from '../../Infra/Database/repositories/users.repository';
import { HashService } from '../../Infra/Services/hash.service';
import { IUserRepository } from '../Ports/Repositories/IUserRepository';
import { IHashService } from '../Ports/Services/IHashService';
import { DeleteUserUseCase } from '../UseCases/Users/DeleteUserUseCase';
import { GetUserUseCase } from '../UseCases/Users/GetUserUseCase';
import { UpdateUserUseCase } from '../UseCases/Users/UpdateUserUseCase';

export const usersExports: string[] = Object.values(UsersUseCasesEnum);

export const usersProviders: Provider[] = [
  {
    provide: UsersUseCasesEnum.UPDATE_USER,
    inject: [UsersRepository, HashService],
    useFactory: (usersRepository: IUserRepository, hashService: IHashService) =>
      new UpdateUserUseCase(usersRepository, hashService),
  },
  {
    provide: UsersUseCasesEnum.GET_USER,
    inject: [UsersRepository],
    useFactory: (usersRepository: IUserRepository) =>
      new GetUserUseCase(usersRepository),
  },
  {
    provide: UsersUseCasesEnum.DELETE_USER,
    inject: [UsersRepository],
    useFactory: (usersRepository: IUserRepository) =>
      new DeleteUserUseCase(usersRepository),
  },
];
