import { User } from '@@be-haptap/app/auth/entities/user.entity';
import { HttpRequest, HttpResponse } from '@@be-haptap/app/models/http';

export interface HttpAuthRequest extends HttpRequest {
  user: User;
}

export interface HttpAuthResponse extends HttpResponse {}
