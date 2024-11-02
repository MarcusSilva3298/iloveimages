import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IHashService } from '../../App/Ports/Services/IHashService';

@Injectable()
export class HashService implements IHashService {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 6);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
