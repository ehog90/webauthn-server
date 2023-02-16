import { Module } from '@nestjs/common';

import { UserController } from './controller/user/user.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class DbModule {}
