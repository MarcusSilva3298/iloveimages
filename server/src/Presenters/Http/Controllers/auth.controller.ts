import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/Domain/Entities/User';
import { GetUser } from 'src/Presenters/Http/Decorators/user.decorator';
import { AuthGuard } from 'src/Presenters/Http/Guards/auth.guard';
import { IUseCase } from '../../../App/Ports/IUseCase';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';
import { AuthUseCasesEnum } from '../../../Domain/Shared/Enums/AuthUseCasesEnum';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignResponse';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthUseCasesEnum.SIGN_IN)
    private readonly signInUseCase: IUseCase<ISignResponse, [SignInDto]>,

    @Inject(AuthUseCasesEnum.SIGN_UP)
    private readonly signUpUseCase: IUseCase<ISignResponse, [SignInDto]>,

    @Inject(AuthUseCasesEnum.GET_ME)
    private readonly getMeUseCase: IUseCase<User, [string]>,
  ) {}

  @Post('/signIn')
  signIn(@Body() body: SignInDto): Promise<ISignResponse> {
    return this.signInUseCase.execute(body);
  }

  @Post('/signUp')
  signUp(@Body() body: UserFactoryDto): Promise<ISignResponse> {
    return this.signUpUseCase.execute(body);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getMe(@GetUser() user: User): Promise<User> {
    return this.getMeUseCase.execute(user.id);
  }
}
