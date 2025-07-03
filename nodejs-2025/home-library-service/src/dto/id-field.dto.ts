import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IIdField } from '../interfaces/id-field.interface';

export class IdFieldDto implements IIdField {
  @ApiProperty({ description: 'UUID field', format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
