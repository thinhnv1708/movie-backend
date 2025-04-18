import { Module } from '@nestjs/common';
import { UserController } from './UserController';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';
import { SendMessageModule } from '../../send-message/SendMessageModule';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';

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
  ],
})
export class UserModule {}
