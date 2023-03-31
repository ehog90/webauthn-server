import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthenticationDataService {
  constructor(private readonly prismaService: PrismaService) {}

  public async saveAuth(user: User, publicKey: string, credentialId: string) {
    await this.prismaService.authentication.create({
      data: { userId: user.id, publicKey, credentialId },
    });
  }

  public async deleteAuth(id: number) {
    await this.prismaService.authentication.deleteMany({
      where: { id },
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

  public async getAuthById(id: string) {
    return await this.prismaService.authentication.findFirst({
      where: {
        credentialId: id,
      },
    });
  }
}
