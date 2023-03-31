import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserData } from '../../../auth/decorators/user-data/user-data.decorator';
import { JwtGuard } from '../../../auth/guards/jwt/jwt.guard';
import { AuthenticationDataService } from '../../services/authentication-data/authentication-data.service';

@Controller('authentication')
@UseGuards(JwtGuard)
export class AuthenticationController {
  constructor(private readonly authDataService: AuthenticationDataService) {}

  @Get('')
  public async getAuthsForUser(@UserData() user: User) {
    return await this.authDataService.getAuthsForUser(user);
  }

  @Delete(':id')
  public async deleteAuth(@Param('id') id: number) {
    return await this.authDataService.deleteAuth(id);
  }
}
