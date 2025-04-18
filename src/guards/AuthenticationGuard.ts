import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../iam/auth/AuthService';
import BusinessError from '../lib/BusinessError';
import StatusCode from '../lib/StatusCode';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthenticationGuard called');

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new BusinessError(StatusCode.UNAUTHROIZED);
    }

    const decodedToken = await this.authService.verifyToken(token);

    request.tokenPayload = decodedToken;

    return true;
  }
}
