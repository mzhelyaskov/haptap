import { AuthProviderName } from '@app/auth/models/auth-provider-name';
import { UserData } from '@app/auth/models/user-data';

export abstract class OAuthProfile {
  abstract provider: AuthProviderName;
  abstract email: string;
  abstract fullName: string;
  abstract avatarUrl?: string;
  abstract toUserData(): UserData;
}