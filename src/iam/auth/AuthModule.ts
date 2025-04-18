import { Global, Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { AuthRepository } from './AuthRepository';
import { UserModule } from '../user/UserModule';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { IatModule } from '../iat/IatModule';

@Global()
@Module({
  imports: [UserModule, JwtModule.register({}), ConfigModule, IatModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthRepo',
      useClass: AuthRepository,
    },
    AuthService,
    PasswordHandler,
  ],
  exports: [AuthService, 'AuthRepo'],
})
export class AuthModule {}
