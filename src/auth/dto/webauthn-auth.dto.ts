import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WebauthnAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  public clientData: string;

  @ApiProperty()
  @IsNotEmpty()
  public authenticatorData: string;

  @ApiProperty()
  @IsNotEmpty()
  public signature: string;

  @ApiProperty()
  @IsNotEmpty()
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  public type: string;
}
