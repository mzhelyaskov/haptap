import { GoogleOAuthGuard } from '@@be-api/app/auth/guards/google-oauth.guard';
import { JwtAuthGuard } from '@@be-api/app/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@@be-api/app/auth/guards/local-auth.guard';
import { UserEntityMapper } from '@@be-api/app/auth/mappers/user-entity.mapper';
import { UserResponseDto } from '@@be-api/app/auth/models/dto/user.dto';
import { HttpAuthRequest, HttpAuthResponse } from '@@be-api/app/auth/models/http-auth-request';
import { JwtAccessToken } from '@@be-api/app/auth/models/jwt-access-token';
import { AuthService } from '@@be-api/app/auth/services/auth.service';
import { Controller, Get, Inject, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CookieOptions } from 'express-serve-static-core';
import { ENV } from '@@be-api/environments/tokens';
import { Environment } from '@@be-api/environments/models';

@Controller('auth')
export class AuthController {
  private readonly accessTokenCookieName: string = 'access_token';
  private readonly accessTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  };

  constructor(private authService: AuthService, @Inject(ENV) private env: Environment) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @Request() req: HttpAuthRequest,
    @Response({ passthrough: true }) res: HttpAuthResponse,
  ): UserResponseDto {
    const token: JwtAccessToken = this.authService.createAccessToken(req.user);
    res.cookie(this.accessTokenCookieName, token.accessToken, this.accessTokenCookieOptions);
    return UserEntityMapper.toUserResponseDto(req.user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(
    @Request() req: HttpAuthRequest,
    @Response({ passthrough: true }) res: HttpAuthResponse,
  ): void {
    res.clearCookie(this.accessTokenCookieName);
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  googleAuth(): void {
    /* NOOP */
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthCallback(@Request() req: HttpAuthRequest, @Response() res: HttpAuthResponse): void {
    const token: JwtAccessToken = this.authService.createAccessToken(req.user);
    res.cookie(this.accessTokenCookieName, token.accessToken, this.accessTokenCookieOptions);
    res.redirect(`${ this.env.frontendUrl }/auth/callback`); // TODO keep whole URL in config
  }
}
