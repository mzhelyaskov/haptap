import { AuthProviderName } from '@@be-api/app/auth/models/auth-provider-name';

export class UserResponseDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  providerName: AuthProviderName;
}
