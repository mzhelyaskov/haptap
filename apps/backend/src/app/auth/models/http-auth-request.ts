import { User } from '@app/auth/entities/user.entity';
import { HttpRequest, HttpResponse } from '@app/models/http';

export interface HttpAuthRequest extends HttpRequest {
  user: User;
}

export interface HttpAuthResponse extends HttpResponse {}