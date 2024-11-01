import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { IPayload } from '../../../Domain/Shared/Interfaces/IPayload';

export interface ITokenService {
  sign(payload: IPayload, secret: string, options?: SignOptions): string;
  verifiy(token: string, secret: string, options?: VerifyOptions): IPayload;
}
