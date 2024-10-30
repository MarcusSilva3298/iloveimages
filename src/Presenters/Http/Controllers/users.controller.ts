import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IUseCase } from '../../../App/Ports/IUseCase';
import { User } from '../../../Domain/Entities/User';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { UsersUseCasesEnum } from '../../../Domain/Shared/Enums/UsersUseCasesEnum';

@Controller('/users')
export class UsersController {
  constructor(
    @Inject(UsersUseCasesEnum.CREATE_USER)
    private readonly createUserUseCase: IUseCase<User, [UserFactoryDto]>,

    @Inject(UsersUseCasesEnum.UPDATE_USER)
    private readonly updateUserUseCase: IUseCase<
      User,
      [string, UserFactoryDto]
    >,

    @Inject(UsersUseCasesEnum.GET_USER)
    private readonly getUserUseCase: IUseCase<User, [string]>,

    @Inject(UsersUseCasesEnum.DELETE_USER)
    private readonly deleteUseruseCase: IUseCase<User, [string]>,
  ) {}

  @Post()
  create(@Body() body: UserFactoryDto): Promise<User> {
    return this.createUserUseCase.execute(body);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UserFactoryDto): Promise<User> {
    return this.updateUserUseCase.execute(id, body);
  }

  @Get('/:id')
  find(@Param('id') id: string): Promise<User> {
    return this.getUserUseCase.execute(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<User> {
    return this.deleteUseruseCase.execute(id);
  }
}
