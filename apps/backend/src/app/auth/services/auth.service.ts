import { User } from '@app/auth/entities/user.entity';
import { AuthProviderName } from '@app/auth/models/auth-provider-name';
import { JwtAccessToken } from '@app/auth/models/jwt-access-token';
import { JwtPayload } from '@app/auth/models/jwt-payload';
import { OAuthProfile } from '@app/auth/models/oauth-profile';
import { UserCredentials } from '@app/auth/models/user-credentials';
import { SignUpData } from '@app/auth/models/sign-up-data';
import { UserData } from '@app/auth/models/user-data';
import { UserService } from '@app/auth/services/user.service';
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
    if (!user) {
      return null;
    }
    const isPasswordValid: boolean = await this.userService.validatePassword$(
      credentials.password,
      user.passwordHash!
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

  async findOrCreateUserFromOAuth$(profile: OAuthProfile): Promise<User> {
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