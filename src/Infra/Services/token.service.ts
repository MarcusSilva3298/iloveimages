import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { ITokenService } from '../../App/Ports/Services/ITokenService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { IPayload } from '../../Domain/Shared/Interfaces/IPayload';

@Injectable()
export class TokenService implements ITokenService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor(configService: ConfigService) {
    this.accessSecret = configService.get(EnvVariablesEnum.TOKEN_SECRET);
    this.accessExpiresIn = configService.get(EnvVariablesEnum.TOKEN_EXPIRES_IN);

    this.refreshSecret = configService.get(EnvVariablesEnum.REFRESH_SECRET);
    this.refreshExpiresIn = configService.get(
      EnvVariablesEnum.REFRESH_EXPIRES_IN,
    );
  }

  private sign(
    payload: IPayload,
    secret: string,
    options?: SignOptions,
  ): string {
    try {
      return sign(payload, secret, options);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Failed to generate token!',
      );
    }
  }

  private verifiy(
    token: string,
    secret: string,
    options?: VerifyOptions,
  ): IPayload {
    try {
      return verify(token, secret, options) as IPayload;
    } catch (error) {
      if (error.message === 'jwt malformed')
        throw new UnauthorizedException('Invalid token!');

      throw new InternalServerErrorException(error, 'Faile to verify token!');
    }
  }

  signAccess(payload: IPayload): string {
    return this.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiresIn,
    });
  }

  verifiyAccess(token: string): IPayload {
    return this.verifiy(token, this.accessSecret);
  }

  signRefresh(payload: IPayload): string {
    return this.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    });
  }

  verifiyRefresh(token: string): IPayload {
    return this.verifiy(token, this.refreshSecret);
  }
}
