import { AuthProviderName } from '@app/auth/models/auth-provider-name';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl?: string;

  @Column({ type: 'enum', enum: AuthProviderName })
  providerName: AuthProviderName;

  @Column({ type: 'varchar', length: 100, nullable: true })
  passwordHash?: string;
}