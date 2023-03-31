import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../../db/services/user/user.service';

@Injectable()
export class AuthService {
  // #region Constructors (1)

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public async authByPassword(
    userName: string,
    password: string,
  ): Promise<{ userData: User | null; jwt: string | null }> {
    const userData = await this.userService.findByName(userName, false);
    if (!userData) {
      return { userData: null, jwt: null };
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return { userData: null, jwt: null };
    }
    delete userData.password;
    const jwt = await this.jwtService.signAsync({
      userName: userData.userName,
    });
    return { userData, jwt };
  }

  public async authByUserId(
    userId: number,
  ): Promise<{ userData: User | null; jwt: string | null }> {
    const userData = await this.userService.findById(userId, false);
    if (!userData) {
      return { userData: null, jwt: null };
    }
    const jwt = await this.jwtService.signAsync({
      userName: userData.userName,
    });
    return { userData, jwt };
  }

  // #endregion Public Methods (1)
}
