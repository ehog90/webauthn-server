import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthenticationDataService } from '../../../db/services/authentication-data/authentication-data.service';
import { UserData } from '../../decorators/user-data/user-data.decorator';
import { JwtResponseDto } from '../../dto/jwt-response.dto';
import { LoginPasswordDto } from '../../dto/login-password.dto';
import { WebauthnAuthDto } from '../../dto/webauthn-auth.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { AuthService } from '../../services/auth/auth.service';
import { verifyAuthenticatorAssertionResponse } from '../../utils/webauthn.util';

@Controller('login')
export class LoginController {
  // #region Constructors (1)

  constructor(
    private readonly authService: AuthService,
    private readonly authenticationDataService: AuthenticationDataService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (3)

  @Get('user-data')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public getUserData(@UserData() userData: User) {
    return userData;
  }

  @Post('password')
  public async loginWithPassword(
    @Body() loginPasswordData: LoginPasswordDto,
  ): Promise<JwtResponseDto> {
    const authResult = await this.authService.authByPassword(
      loginPasswordData.userName,
      loginPasswordData.password,
    );
    if (authResult.jwt) {
      const jwt = new JwtResponseDto();
      jwt.token = authResult.jwt;
      return jwt;
    }
    throw new ForbiddenException('Login failed.');
  }

  @Post('webauthn')
  public async register(@Body() authRequest: WebauthnAuthDto) {
    const authData = await this.authenticationDataService.getAuthById(
      authRequest.id,
    );
    if (authData) {
      const verify = verifyAuthenticatorAssertionResponse(
        authRequest,
        authData,
      );
      if (verify) {
        const authResult = await this.authService.authByUserId(authData.userId);
        if (authResult.jwt) {
          const jwt = new JwtResponseDto();
          jwt.token = authResult.jwt;
          return jwt;
        }
      }
    } else {
      throw new ForbiddenException('Login failed.');
    }
  }

  // #endregion Public Methods (3)
}
