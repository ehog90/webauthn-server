import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UserData } from '../../decorators/user-data/user-data.decorator';
import { JwtResponseDto } from '../../dto/jwt-response.dto';
import { LoginPasswordDto } from '../../dto/login-password.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { AuthService } from '../../services/auth/auth.service';

@Controller('login')
export class LoginController {
  // #region Constructors (1)

  constructor(private readonly authService: AuthService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

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
    throw new UnauthorizedException('Login failed.');
  }

  // #endregion Public Methods (2)
}
