import { Body, Controller, Inject, Post } from '@nestjs/common';
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
  ) {}

  @Post('/signIn')
  signIn(@Body() body: SignInDto): Promise<ISignResponse> {
    return this.signInUseCase.execute(body);
  }

  @Post('/signUp')
  signUp(@Body() body: UserFactoryDto): Promise<ISignResponse> {
    return this.signUpUseCase.execute(body);
  }
}
