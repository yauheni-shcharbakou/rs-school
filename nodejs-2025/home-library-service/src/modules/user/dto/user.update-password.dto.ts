import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUserUpdatePassword } from '../../../models/user.model';

export class UserUpdatePasswordDto implements IUserUpdatePassword {
  @ApiProperty({ description: 'New user password' })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({ description: 'Old user password' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
