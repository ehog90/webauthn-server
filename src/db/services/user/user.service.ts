import { Injectable } from '@nestjs/common';

import { encryptPassword } from '../../helpers/bcrypt.helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService extends PrismaService {
  // #region Constructors (1)

  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public async addNewUser(userName: string, rawPassword: string) {
    const password = await encryptPassword(rawPassword);
    await this.prismaService.user.create({ data: { userName, password } });
  }

  public async findByName(userName: string, omitPassword = true) {
    const user = await this.prismaService.user.findUnique({
      where: { userName },
    });
    if (!user) {
      return null;
    }
    omitPassword && delete user.password;
    return user;
  }

  public async getUserList() {
    const users = await this.prismaService.user.findMany();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  // #endregion Public Methods (3)
}
