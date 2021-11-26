import { Controller, Get, Header, Req } from '@nestjs/common';
import { Request } from "express";
import UnsecuredJWT from 'jose/jwt/unsecured';

@Controller()
export class AppController {

  @Get('me')
  @Header('Content-Type', 'text/plain')
  async _(@Req() req: Request): Promise<string> {
    try {
      const [email, id] = UnsecuredJWT
        .decode(req.cookies['__Secure-jwt'], {maxTokenAge: '30s'})
        .payload.sub.split(/,(?=[^,]*$)/);
      return `The signed in user has e-mail address ${email} and id ${id}.`;
    } catch {
      return `Authentication token absent, malformed or expired. If you're signed up, you may wish to sign in again and retry.`;
    };
  }
}