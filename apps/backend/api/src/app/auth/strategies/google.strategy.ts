import { User } from '@@be-api/app/auth/entities/user.entity';
import { GoogleOAuthProfile } from '@@be-api/app/auth/models/google-oauth-profile';
import { GoogleOAuthUserProfile } from '@@be-api/app/auth/models/google-oauth-user-profile';
import { OAuthProfile } from '@@be-api/app/auth/models/oauth-profile';
import { AuthService } from '@@be-api/app/auth/services/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { WithoutCallback } from '@nestjs/passport/dist/interfaces';
import { AllConstructorParameters } from '@nestjs/passport/dist/passport/passport.strategy';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Environment } from '@@be-api/environments/models';
import { ENV } from '@@be-api/environments/tokens';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    @Inject(ENV) private env: Environment
  ) {
    super({
      clientID: env.google.clientId,
      clientSecret: env.google.clientSecret,
      callbackURL: env.google.callbackUrl,
      failureRedirectURL: env.oAuthFailureRedirectUrl,
      scope: ['profile', 'email'],
    } as WithoutCallback<AllConstructorParameters<unknown>>);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleOAuthUserProfile,
    done: VerifyCallback
  ): Promise<void> {
    const oAuthProfile: OAuthProfile = new GoogleOAuthProfile(profile);
    const user: User = await this.authService.findOrCreateUserByOAuthProfile$(oAuthProfile);
    done(null, user);
  }
}
