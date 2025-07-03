import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthTokens } from '../auth.types';

export class AuthTokensDto implements IAuthTokens {
  @ApiProperty({ description: 'Access token' })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
