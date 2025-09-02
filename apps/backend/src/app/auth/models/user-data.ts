import { User } from '@app/auth/entities/user.entity';

export type UserData = Omit<User, 'id'>;