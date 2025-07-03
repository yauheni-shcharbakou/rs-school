import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IdFieldDto } from '../id-field.dto';
import { IArtist } from '../../models/artist.model';

export class ArtistDto extends IdFieldDto implements IArtist {
  @ApiProperty({ description: 'Artist name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Is artist has grammy' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  @Exclude()
  favoritesId?: string;
}
