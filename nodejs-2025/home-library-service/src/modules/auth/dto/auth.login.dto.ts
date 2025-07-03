import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUserCreate } from '../../../models/user.model';
import { UserDto } from '../../../dto/models/user.dto';

export class AuthLoginDto
  extends PickType(UserDto, ['login'] as const)
  implements IUserCreate
{
  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
