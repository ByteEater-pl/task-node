import { Module } from '@nestjs/common';
import { UserDbService } from './user-db/user-db.service';
import { AppController } from './app.controller';
import { SignupController } from './signup/signup.controller';
import { SigninController } from './signin/signin.controller';

@Module({
  controllers: [AppController, SignupController, SigninController],
  providers: [UserDbService]
})
export class AppModule {}