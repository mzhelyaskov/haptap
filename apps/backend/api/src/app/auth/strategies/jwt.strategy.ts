import { User } from '@@be-api/app/auth/entities/user.entity';
import { JwtPayload } from '@@be-api/app/auth/models/jwt-payload';
import { UserService } from '@@be-api/app/auth/services/user.service';
import { ENV_CONFIG, EnvConfig } from '@@be-api/environments';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, @Inject(ENV_CONFIG) private env: EnvConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user: User | null = await this.userService.findById$(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User is invalid or blocked');
    }
    return user;
  }
}
