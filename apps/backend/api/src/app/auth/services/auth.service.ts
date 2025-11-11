import { User } from '@@be-api/app/auth/entities/user.entity';
import { AuthProviderName } from '@@be-api/app/auth/models/auth-provider-name';
import { JwtAccessToken } from '@@be-api/app/auth/models/jwt-access-token';
import { JwtPayload } from '@@be-api/app/auth/models/jwt-payload';
import { OAuthProfile } from '@@be-api/app/auth/models/oauth-profile';
import { UserCredentials } from '@@be-api/app/auth/models/user-credentials';
import { SignUpData } from '@@be-api/app/auth/models/sign-up-data';
import { UserData } from '@@be-api/app/auth/models/user-data';
import { UserService } from '@@be-api/app/auth/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate$(credentials: UserCredentials): Promise<User | null> {
    const user: User | null = await this.userService.findByEmail$(credentials.email);
    if (!user || !user.passwordHash) {
      return null;
    }
    const isPasswordValid: boolean = await this.userService.validatePassword$(
      credentials.password,
      user.passwordHash
    );
    return isPasswordValid ? user : null;
  }

  async register$(data: SignUpData): Promise<User> {
    const userData: UserData = {
      email: data.email,
      providerName: AuthProviderName.APPLICATION,
      passwordHash: await this.userService.hashPassword$(data.password),
      firstName: data.firstName,
      lastName: data.lastName,
    };
    // TODO Send email validation request
    return this.userService.create$(userData);
  }

  async findOrCreateUserByOAuthProfile$(profile: OAuthProfile): Promise<User> {
    let user: User | null = await this.userService.findByEmail$(profile.email);
    if (user) {
      // TODO Update user data if needed
    } else {
      const userData: UserData = profile.toUserData();
      user = await this.userService.create$(userData);
    }
    return user;
  }

  createAccessToken(user: User): JwtAccessToken {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }) };
  }
}
