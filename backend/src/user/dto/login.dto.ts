import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'giavyvn123' })
  username: string;

  @ApiProperty({ example: '123123' })
  password: string;
}
