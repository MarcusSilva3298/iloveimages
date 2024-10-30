import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserFactoryDto {
  @IsEmail()
  @IsString()
  email: string;

  // @Matches('^(?=.[a-z])(?=.[A-Z])(?=.d)(?=.[W_]).+$')
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  alias: string;
}
