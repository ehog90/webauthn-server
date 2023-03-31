import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthenticationDataService {
  // #region Constructors (1)

  constructor(private readonly prismaService: PrismaService) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public async deleteAuth(id: number) {
    await this.prismaService.authentication.deleteMany({
      where: { id },
    });
  }

  public async getAuthById(id: string) {
    return await this.prismaService.authentication.findFirst({
      where: {
        credentialId: id,
      },
    });
  }

  public async getAuthsForUser(user: User) {
    const data = await this.prismaService.authentication.findMany({
      where: {
        userId: user.id,
      },
    });
    data.forEach((auth) => (auth.publicKey = null));
    return data;
  }

  public async saveAuth(user: User, publicKey: string, credentialId: string) {
    await this.prismaService.authentication.create({
      data: { userId: user.id, publicKey, credentialId },
    });
  }

  // #endregion Public Methods (4)
}
