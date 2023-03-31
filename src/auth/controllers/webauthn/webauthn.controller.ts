import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
export class WebauthnController {
  constructor(
    private readonly authenticationDatService: AuthenticationDataService,
  ) {}

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
}
