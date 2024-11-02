import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IUseCase } from '../../../App/Ports/IUseCase';
import { User } from '../../../Domain/Entities/User';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { UsersUseCasesEnum } from '../../../Domain/Shared/Enums/UsersUseCasesEnum';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/users')
export class UsersController {
  constructor(
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
