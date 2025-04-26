import { Module } from '@nestjs/common';
import { ActionModule } from './action/ActionModule';
import { GroupModule } from './group/GroupModule';
import { PersonalizedModule } from './personalized/PersonalizedModule';
import { PolicyModule } from './policy/PolicyModule';
import { UserModule } from './user/UserModule';
import { AuthModule } from './auth/AuthModule';

@Module({
  imports: [
    AuthModule,
    ActionModule,
    UserModule,
    PolicyModule,
    GroupModule,
    PersonalizedModule,
  ],
})
export class IAMModule {}
