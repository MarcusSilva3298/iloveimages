import { User } from '../../../Domain/Entities/User';
import { UserFactoryDto } from '../../../Domain/Shared/Dtos/User/UserFactoryDto';

export interface IUserRepository {
  create(params: UserFactoryDto): Promise<User>;
  update(id: string, params: UserFactoryDto): Promise<User>;
  findByAlias(alias: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string, includeDeleted?: boolean): Promise<User>;
  softDelete(id: string): Promise<User>;
}
