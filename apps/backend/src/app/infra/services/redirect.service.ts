import { Config } from '@app/services/config';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class RedirectService {
  redirectWithToken(token: string, res: Response): void {
    // TODO Consider using interface + provider not to import redirect service from outside
    const url: string = `${Config.host}/auth/callback?token=${token}`;
    res.redirect(302, url);
  }
}