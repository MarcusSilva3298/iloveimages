export interface IHashService {
  hashPassword(password: string): Promise<string>;
  compareHash(string: string, hash: string): Promise<boolean>;
}
