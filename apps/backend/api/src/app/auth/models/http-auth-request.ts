import { User } from '@@be-api/app/auth/entities/user.entity';
import { HttpRequest, HttpResponse } from '@@be-api/app/models/http';

export interface HttpAuthRequest extends HttpRequest {
  user: User;
}

export interface HttpAuthResponse extends HttpResponse {}
