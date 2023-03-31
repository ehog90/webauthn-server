import { Module } from '@nestjs/common';

import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthenticationDataService } from './services/authentication-data/authentication-data.service';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';

@Module({
  providers: [UserService, PrismaService, AuthenticationDataService],
  controllers: [UserController, AuthenticationController],
  exports: [UserService, AuthenticationDataService],
})
export class DbModule {}
