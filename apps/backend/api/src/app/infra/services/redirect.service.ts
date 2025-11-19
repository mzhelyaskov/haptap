import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ENV } from '@@be-api/environments/tokens';
import { Environment } from '@@be-api/environments/models';

@Injectable()
export class RedirectService {
  constructor(@Inject(ENV) private env: Environment) {}

  redirectWithToken(token: string, res: Response): void {
    // TODO Consider using interface + provider not to import redirect service from outside
    const url: string = `${this.env.host}/auth/callback?token=${token}`;
    res.redirect(302, url);
  }
}
