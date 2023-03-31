import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RandomKeyDto {
  @IsNotEmpty()
  @ApiProperty()
  public key: string;

  constructor(key: string) {
    this.key = key;
  }
}
