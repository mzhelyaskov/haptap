import { AuthProviderName } from '@app/auth/models/auth-provider-name';
import { UserData } from '@app/auth/models/user-data';
import { OAuthProfile } from '@app/auth/models/oauth-profile';

export class GoogleOAuthProfile extends OAuthProfile {
  public readonly provider: AuthProviderName = AuthProviderName.GOOGLE;

  constructor(private readonly profile: any) {
    super();
  }

  get email(): string {
    return this.profile.emails?.[0]?.value!;
  }

  get fullName(): string {
    const givenName: string = this.profile?.name?.givenName || '';
    const familyName: string = this.profile?.name?.familyName || '';
    return `${ givenName } ${ familyName }`.trim();
  }

  get avatarUrl(): string | undefined {
    return this.profile.photos?.[0]?.value;
  }

  toUserData(): UserData {
    return {
      email: this.email,
      firstName: this.fullName,
      providerName: this.provider,
      avatarUrl: this.avatarUrl
    };
  }
}