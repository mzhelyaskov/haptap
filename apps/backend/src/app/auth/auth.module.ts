import { AuthController } from '@app/auth/auth.controller';
import { JwtConstants } from '@app/auth/constants';
import { User } from '@app/auth/entities/user.entity';
import { GoogleOAuthGuard } from '@app/auth/guards/google-oauth.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { AuthService } from '@app/auth/services/auth.service';
import { UserService } from '@app/auth/services/user.service';
import { GoogleStrategy } from '@app/auth/strategies/google.strategy';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { InfraModule } from '@app/infra/infra.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    InfraModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    GoogleOAuthGuard,
    JwtAuthGuard,
    LocalAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}