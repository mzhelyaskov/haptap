import { InfraModule } from '@@be-api/app/infra/infra.module';
import { AuthController } from '@@be-api/app/auth/auth.controller';
import { JwtConstants } from '@@be-api/app/auth/constants';
import { User } from '@@be-api/app/auth/entities/user.entity';
import { GoogleOAuthGuard } from '@@be-api/app/auth/guards/google-oauth.guard';
import { JwtAuthGuard } from '@@be-api/app/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@@be-api/app/auth/guards/local-auth.guard';
import { AuthService } from '@@be-api/app/auth/services/auth.service';
import { UserService } from '@@be-api/app/auth/services/user.service';
import { GoogleStrategy } from '@@be-api/app/auth/strategies/google.strategy';
import { JwtStrategy } from '@@be-api/app/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@@be-api/app/auth/strategies/local.strategy';
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
