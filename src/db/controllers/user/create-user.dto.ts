import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  public userName: string;
  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}
