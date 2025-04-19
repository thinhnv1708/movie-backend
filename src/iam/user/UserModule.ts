import { Module } from '@nestjs/common';
import { UserController } from './UserController';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';
import { SendMessageModule } from '../../send-message/SendMessageModule';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { UserTokenHelper } from '../../lib/helpers/UserTokenHelper';

@Module({
  imports: [SendMessageModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepo',
      useClass: UserRepository,
    },
    UserService,
    PasswordHandler,
    UserTokenHelper,
  ],
})
export class UserModule {}
