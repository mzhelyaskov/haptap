import { User } from '@app/auth/entities/user.entity';
import { UserCredentials } from '@app/auth/models/user-credentials';
import { AuthService } from '@app/auth/services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const credentials: UserCredentials = { email, password };
    const user: User | null = await this.authService.authenticate$(credentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}