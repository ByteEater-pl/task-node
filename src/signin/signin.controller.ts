import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from "express";
import { UserDbService } from '../user-db/user-db.service';
import { User } from '../models/user.dto';
import * as crypto from 'crypto';
import UnsecuredJWT from 'jose/jwt/unsecured';

@Controller('signin')
export class SigninController {
  constructor(private mongo: UserDbService) {}

  @Post()
  async _(
    @Body() user: User,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const dbUser = await (await this.mongo.usersCollection)
        .findOne({email: user.email}, {projection: {password: 1, salt: 1}});
      if (dbUser.password ==
        crypto.scryptSync(user.password, dbUser.salt, 30).toString('hex'))
        return void res
          .status(HttpStatus.OK)
          .cookie(
            '__Secure-jwt',
            new UnsecuredJWT({sub: `${user.email},${dbUser._id}`})
              .setExpirationTime('30s')
              .setIssuedAt()
              .encode(),
            {expires: new Date(Date.now() + 30000), secure: true, httpOnly: true});
    } catch {};
    res.status(HttpStatus.FORBIDDEN);
  }
}