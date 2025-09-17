import { InfraModule } from '@@be-haptap/app/infra/infra.module';
import { AuthController } from '@@be-haptap/app/auth/auth.controller';
import { JwtConstants } from '@@be-haptap/app/auth/constants';
import { User } from '@@be-haptap/app/auth/entities/user.entity';
import { GoogleOAuthGuard } from '@@be-haptap/app/auth/guards/google-oauth.guard';
import { JwtAuthGuard } from '@@be-haptap/app/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@@be-haptap/app/auth/guards/local-auth.guard';
import { AuthService } from '@@be-haptap/app/auth/services/auth.service';
import { UserService } from '@@be-haptap/app/auth/services/user.service';
import { GoogleStrategy } from '@@be-haptap/app/auth/strategies/google.strategy';
import { JwtStrategy } from '@@be-haptap/app/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@@be-haptap/app/auth/strategies/local.strategy';
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
