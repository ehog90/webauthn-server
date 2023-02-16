import { Injectable } from '@nestjs/common';

import { encryptPassword } from '../../helpers/bcrypt.helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService extends PrismaService {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  public async addNewUser(userName: string, rawPassword: string) {
    const password = await encryptPassword(rawPassword);
    await this.prismaService.user.create({ data: { userName, password } });
  }

  public async getUserList() {
    const users = await this.prismaService.user.findMany();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }
}
