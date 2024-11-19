import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GenerateTokenDto {
  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;
}
