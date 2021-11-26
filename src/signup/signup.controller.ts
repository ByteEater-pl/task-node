import { Body, Controller, Header, Post } from '@nestjs/common';
import { UserDbService } from 'src/user-db/user-db.service';
import { User } from '../models/user.dto';
import * as crypto from 'crypto';

@Controller('signup')
export class SignupController {
  constructor(private mongo: UserDbService) {}

  @Post()
  @Header('Content-Type', 'text/plain')
  async _(@Body() user: User) {
    user.salt = crypto.randomBytes(27).toString('hex')
    user.password = crypto.scryptSync(user.password, user.salt, 30).toString('hex')
    await (await this.mongo.usersCollection).insertOne(user);
    return `The user with e-mail address ${user.email} has been signed up.`;
  }
}