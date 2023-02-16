import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  iat: number;
  @ApiProperty()
  exp: number;
}
