import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthRefresh } from '../auth.types';

export class AuthRefreshDto implements IAuthRefresh {
  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
