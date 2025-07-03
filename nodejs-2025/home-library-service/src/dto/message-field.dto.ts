import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageFieldDto {
  @ApiProperty({ description: 'Result message' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
