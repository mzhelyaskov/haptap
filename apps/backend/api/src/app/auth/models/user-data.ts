import { User } from '@@be-api/app/auth/entities/user.entity';

export type UserData = Omit<User, 'id'>;
