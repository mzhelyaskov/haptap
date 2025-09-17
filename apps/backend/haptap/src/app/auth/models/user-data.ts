import { User } from '@@be-haptap/app/auth/entities/user.entity';

export type UserData = Omit<User, 'id'>;
