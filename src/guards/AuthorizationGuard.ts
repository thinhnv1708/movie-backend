import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../iam/auth/AuthService';
import BusinessError from '../lib/BusinessError';
import StatusCode from '../lib/StatusCode';
import IUserData from '../lib/interfaces/IUserData';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    let path = request.path;

    path = path.replace(/^\/api/, '');

    const userData: IUserData = request.userData;

    const allowed = await this.authService.checkPermission(
      {
        userId: userData.userId,
        isRoot: userData.isRoot,
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
