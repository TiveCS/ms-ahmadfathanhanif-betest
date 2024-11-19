import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bambang' })
  userName: string;

  @IsEmail()
  @ApiProperty({ example: 'bambang@example.com' })
  emailAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '912812121' })
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '8912739213' })
  identityNumber: string;
}
