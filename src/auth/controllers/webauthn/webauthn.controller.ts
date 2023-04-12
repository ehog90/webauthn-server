import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';

import { getRandomKeyForUser } from '../../../db/helpers/bcrypt.helper';
import { AuthenticationDataService } from '../../../db/services/authentication-data/authentication-data.service';
import { UserData } from '../../decorators/user-data/user-data.decorator';
import { RandomKeyDto } from '../../dto/random-key.dto';
import { WebauthnRegistrationDto } from '../../dto/webauthn-registration.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { verifyAuthenticatorAttestationResponse } from '../../utils/webauthn.util';

@Controller('webauthn')
@ApiTags('Webauthn-specific')
export class WebauthnController {
  // #region Constructors (1)

  constructor(
    private readonly authenticationDatService: AuthenticationDataService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (3)

  @Post('key-unauthed')
  public getKey() {
    const key = randomBytes(256).toString();
    return new RandomKeyDto(key);
  }

  @Post('key')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  public async getKeyForUser(@UserData() userData: User) {
    const key = await getRandomKeyForUser(userData);
    return new RandomKeyDto(key);
  }

  @Post('register')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async register(
    @UserData() userData: User,
    @Body() reg: WebauthnRegistrationDto,
  ) {
    const authResponse = verifyAuthenticatorAttestationResponse(reg);
    await this.authenticationDatService.saveAuth(
      userData,
      authResponse.publicKey,
      authResponse.credID,
    );
  }

  // #endregion Public Methods (3)
}
