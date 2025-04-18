import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../iam/auth/AuthService';
import BusinessError from '../lib/BusinessError';
import StatusCode from '../lib/StatusCode';
import IIamTokenPayload from '../lib/interfaces/IIamTokenPayload';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthorizationGuard called');
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    let path = request.path;

    path = path.replace(/^\/api/, '');

    const tokenPayload: IIamTokenPayload = request.tokenPayload;

    const allowed = await this.authService.checkPermission(
      {
        userId: tokenPayload.userId,
        isRoot: tokenPayload.isRoot,
      },
      method,
      path,
    );

    if (!allowed) {
      throw new BusinessError(StatusCode.FORBIDDEN);
    }

    return true;
  }
}
