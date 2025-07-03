import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransformToNullableId } from '../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../decorators/validation.decorator';
import { IdFieldDto } from '../id-field.dto';
import { ITrack } from '../../models/track.model';

export class TrackDto extends IdFieldDto implements ITrack {
  @ApiProperty({ description: 'Track name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist id', nullable: true, format: 'uuid' })
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;

  @ApiProperty({ description: 'Album id', nullable: true, format: 'uuid' })
  @IsUUIDOrNull()
  @TransformToNullableId()
  albumId: string | null;

  @ApiProperty({ description: 'Track duration' })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @Exclude()
  favoritesId?: string;
}
