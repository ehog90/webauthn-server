import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WebauthnRegistrationDto {
  @ApiProperty()
  @IsNotEmpty()
  public clientData: string;

  @ApiProperty()
  @IsNotEmpty()
  public attestationObject: string;

  @ApiProperty()
  @IsNotEmpty()
  public attachment: string;

  @ApiProperty()
  @IsNotEmpty()
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  public type: string;
}
