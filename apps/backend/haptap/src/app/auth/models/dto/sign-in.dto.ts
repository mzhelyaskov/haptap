import { UserCredentials } from '@@be-haptap/app/auth/models/user-credentials';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto implements UserCredentials {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
