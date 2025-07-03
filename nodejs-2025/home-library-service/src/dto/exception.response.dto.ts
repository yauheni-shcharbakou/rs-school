import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ExceptionResponseDto {
  @ApiProperty({
    description: 'Exception message',
    example: 'User not found',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Endpoint path',
    example: '/user/123',
  })
  @IsNotEmpty()
  @IsString()
  path: string;

  @ApiProperty({
    description: 'Exception timestamp',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  timestamp: string;

  @ApiProperty({
    description: 'Exception status code',
    enum: HttpStatus,
    enumName: 'HttpStatus',
    example: HttpStatus.NOT_FOUND,
  })
  @IsNotEmpty()
  @IsEnum(HttpStatus)
  statusCode: HttpStatus;
}
