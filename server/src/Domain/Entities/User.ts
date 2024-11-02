import { Picture } from './Picture';

export class User {
  public readonly id: string;

  public email: string;
  public password: string;

  public name: string;
  public alias: string;
  public profilePicture?: string;

  public Pictres?: Picture[];

  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
}
