import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Wick' })
  userName: string;

  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  emailAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '112233' })
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234567890' })
  identityNumber: string;
}
