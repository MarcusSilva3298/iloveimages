import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUseCase } from '../../../App/Ports/IUseCase';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { AuthUseCasesEnum } from '../../../Domain/Shared/Enums/AuthUseCasesEnum';
import { ISignInResponse } from '../../../Domain/Shared/Interfaces/ISignInResponse';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthUseCasesEnum.SIGN_IN)
    private readonly signInUseCase: IUseCase<ISignInResponse, [SignInDto]>,
  ) {}

  @Post('/signIn')
  signIn(@Body() body: SignInDto): Promise<ISignInResponse> {
    return this.signInUseCase.execute(body);
  }
}
