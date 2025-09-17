import { AuthProviderName } from '@@be-haptap/app/auth/models/auth-provider-name';

export class UserResponseDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  providerName: AuthProviderName;
}
