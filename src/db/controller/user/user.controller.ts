import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return this.userService.getUserList();
  }

  @Post()
  public async addUser(@Body() createUser: CreateUserDto) {
    return this.userService.addNewUser(
      createUser.userName,
      createUser.password,
    );
  }
}
