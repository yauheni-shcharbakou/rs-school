import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { IAlbumCreate } from '../../../models/album.model';
import { AlbumDto } from '../../../dto/models/album.dto';

export class AlbumCreateDto
  extends PickType(AlbumDto, ['name', 'year'] as const)
  implements IAlbumCreate
{
  @ApiProperty({ required: false, nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;
}
