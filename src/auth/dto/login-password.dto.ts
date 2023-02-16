import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  public userName: string;

  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}
