import { User } from '@app/auth/entities/user.entity';
import { UserData } from '@app/auth/models/user-data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create$(userData: UserData): Promise<User> {
    const user: User = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  findByEmail$(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  findById$(userId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  hashPassword$(password: string): Promise<string> {
    const saltRounds: number = 10;
    return bcrypt.hash(password, saltRounds);
  }

  validatePassword$(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}