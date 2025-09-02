import { User } from '@app/auth/entities/user.entity';
import { GoogleOAuthProfile } from '@app/auth/models/google-o-auth-profile';
import { OAuthProfile } from '@app/auth/models/oauth-profile';
import { AuthService } from '@app/auth/services/auth.service';
import { Config } from '@app/services/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { WithoutCallback } from '@nestjs/passport/dist/interfaces';
import { AllConstructorParameters } from '@nestjs/passport/dist/passport/passport.strategy';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: Config.google.clientID,
      clientSecret: Config.google.clientSecret,
      callbackURL: Config.google.callbackURL,
      failureRedirectURL: Config.oAuthFailureRedirectURL,
      scope: ['profile', 'email'],
    } as WithoutCallback<AllConstructorParameters<unknown>>);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> {
    const oAuthProfile: OAuthProfile = new GoogleOAuthProfile(profile);
    const user: User = await this.authService.findOrCreateUserFromOAuth$(oAuthProfile);
    done(null, user);
  }
}