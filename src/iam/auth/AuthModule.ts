import { Global, Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { AuthRepository } from './AuthRepository';
import { UserModule } from '../user/UserModule';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { IatModule } from '../iat/IatModule';
import { UserTokenHelper } from '../../lib/helpers/UserTokenHelper';
import { SendMessageModule } from '../../send-message/SendMessageModule';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    ConfigModule,
    IatModule,
    SendMessageModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthRepo',
      useClass: AuthRepository,
    },
    AuthService,
    PasswordHandler,
    UserTokenHelper,
  ],
  exports: [AuthService, 'AuthRepo'],
})
export class AuthModule {}
