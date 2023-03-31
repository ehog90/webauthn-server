import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
@ApiTags('User Management')
export class UserController {
  // #region Constructors (1)

  constructor(public readonly userService: UserService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  @Post()
  public async addUser(@Body() createUser: CreateUserDto) {
    try {
      return await this.userService.addNewUser(
        createUser.userName,
        createUser.password,
      );
    } catch (err) {
      //Don't do this
      throw new BadRequestException();
    }
  }

  @Delete(':userName')
  public async deleteUser(@Param('id') userName: string) {
    try {
      return await this.userService.deleteUser(userName);
    } catch (err) {
      //Don't do this
      console.log('aaaaa', err);
      throw new BadRequestException();
    }
  }

  @Get()
  public async getAllUsers() {
    return this.userService.getUserList();
  }

  // #endregion Public Methods (2)
}
