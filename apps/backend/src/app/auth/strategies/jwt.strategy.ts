import { User } from '@app/auth/entities/user.entity';
import { JwtPayload } from '@app/auth/models/jwt-payload';
import { UserService } from '@app/auth/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Config } from '@app/services/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.jwt.secret,
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