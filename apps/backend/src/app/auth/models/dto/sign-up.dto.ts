import { SignUpData } from '@app/auth/models/sign-up-data';
import { IsEqualTo } from '@app/shared/decorators/is-equal-to.decorator';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class SignUpDto implements SignUpData {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsEqualTo<SignUpDto>('password')
  passwordConfirm: string;
}