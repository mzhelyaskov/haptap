import { ENV_CONFIG, EnvConfig } from '@@be-api/environments';
import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class RedirectService {
  constructor(@Inject(ENV_CONFIG) private env: EnvConfig) {}

  redirectWithToken(token: string, res: Response): void {
    // TODO Consider using interface + provider not to import redirect service from outside
    const url: string = `${this.env.host}/auth/callback?token=${token}`;
    res.redirect(302, url);
  }
}
