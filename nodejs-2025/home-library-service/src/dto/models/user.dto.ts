import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { IdFieldDto } from '../id-field.dto';
import { IUser } from '../../models/user.model';

export class UserDto extends IdFieldDto implements IUser {
  @ApiProperty({ description: 'User create date timestamp' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  createdAt: number;

  @ApiProperty({ description: 'User login' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ description: 'User update date timestamp' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  updatedAt: number;

  @ApiProperty({ description: 'User entity version', format: 'int32' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  version: number;
}
