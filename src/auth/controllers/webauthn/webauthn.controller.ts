import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { getRandomKeyForUser } from '../../../db/helpers/bcrypt.helper';
import { AuthenticationDataService } from '../../../db/services/authentication-data/authentication-data.service';
import { UserData } from '../../decorators/user-data/user-data.decorator';
import { RandomKeyDto } from '../../dto/random-key.dto';
import { WebauthnRegistrationDto } from '../../dto/webauthn-registration.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { verifyAuthenticatorAttestationResponse } from '../../utils/webauthn.util';

@Controller('webauthn')
@UseGuards(JwtGuard)
@ApiTags('Webauthn-specific')
@ApiBearerAuth()
export class WebauthnController {
  // #region Constructors (1)

  constructor(
    private readonly authenticationDatService: AuthenticationDataService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  @Post('key')
  public async getKeyForUser(@UserData() userData: User) {
    const key = await getRandomKeyForUser(userData);
    return new RandomKeyDto(key);
  }

  @Post('register')
  public async register(
    @UserData() userData: User,
    @Body() reg: WebauthnRegistrationDto,
  ) {
    if (reg.attestationObject && reg.clientData) {
      const authResponse = verifyAuthenticatorAttestationResponse(reg);
      await this.authenticationDatService.saveAuth(
        userData,
        authResponse.publicKey,
        authResponse.credID,
      );
    }
  }

  // #endregion Public Methods (2)
}
