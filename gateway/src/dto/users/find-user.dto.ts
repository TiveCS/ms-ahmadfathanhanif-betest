import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  accountNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '1234567890' })
  identityNumber: string;
}
