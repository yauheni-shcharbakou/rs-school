import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransformToNullableId } from '../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../decorators/validation.decorator';
import { IdFieldDto } from '../id-field.dto';
import { IAlbum } from '../../models/album.model';

export class AlbumDto extends IdFieldDto implements IAlbum {
  @ApiProperty({ description: 'Album name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Album year, should be positive',
    example: 1991,
    format: 'int32',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  year: number;

  @ApiProperty({ description: 'Artist id', nullable: true, format: 'uuid' })
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;

  @Exclude()
  favoritesId?: string;
}
