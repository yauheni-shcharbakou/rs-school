import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { ITrackCreate } from '../../../models/track.model';
import { TrackDto } from '../../../dto/models/track.dto';

export class TrackCreateDto
  extends PickType(TrackDto, ['name', 'duration'] as const)
  implements ITrackCreate
{
  @ApiProperty({
    description: 'Artist id',
    nullable: true,
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;

  @ApiProperty({
    description: 'Album id',
    nullable: true,
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  albumId: string | null;
}
