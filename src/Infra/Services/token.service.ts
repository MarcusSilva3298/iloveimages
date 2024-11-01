import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { ITokenService } from '../../App/Ports/Services/ITokenService';
import { IPayload } from '../../Domain/Shared/Interfaces/IPayload';

@Injectable()
export class TokenService implements ITokenService {
  sign(payload: IPayload, secret: string, options?: SignOptions): string {
    try {
      return sign(payload, secret, options);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Failed to generate token!',
      );
    }
  }

  verifiy(token: string, secret: string, options?: VerifyOptions): IPayload {
    return verify(token, secret, options) as IPayload;
  }
}
