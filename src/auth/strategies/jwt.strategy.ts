import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../../db/services/user/user.service';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-guard') {
  // #region Constructors (1)

  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'jwt_secret',
    });
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public async validate(jwtPayload: JwtTokenDto): Promise<User | boolean> {
    const userData = await this.usersService.findByName(jwtPayload.userName);
    // TOTP won't be enforced if user is just turned it on
    if (!userData) {
      return false;
    }
    return userData;
  }

  // #endregion Public Methods (1)
}
