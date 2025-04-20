import { Module } from '@nestjs/common';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { UserTokenHelper } from '../../lib/helpers/UserTokenHelper';
import { SendMessageModule } from '../../send-message/SendMessageModule';
import { UserController } from './UserController';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';

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
