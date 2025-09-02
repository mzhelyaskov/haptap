import { User } from '@app/auth/entities/user.entity';
import { UserResponseDto } from '@app/auth/models/dto/user.dto';

export class UserEntityMapper {
  static toUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      providerName: user.providerName
    };
  }
}