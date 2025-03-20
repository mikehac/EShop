import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies.jwt,
      ]), // Get token from cookies
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || jwtConstants.secret, // Use a strong secret key
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Attach user info to the request
  }
}
