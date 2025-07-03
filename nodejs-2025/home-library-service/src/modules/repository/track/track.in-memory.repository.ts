import { Injectable } from '@nestjs/common';
import {
  ITrack,
  ITrackCreate,
  ITrackFilter,
} from '../../../models/track.model';
import { BaseInMemoryRepository } from '../base/base.in-memory.repository';
import { ITrackRepository } from './track.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackInMemoryRepository
  extends BaseInMemoryRepository<
    ITrack,
    ITrackCreate,
    ITrackFilter,
    ITrackFilter
  >
  implements ITrackRepository
{
  async create(data: ITrackCreate): Promise<ITrack> {
    const track: ITrack = {
      ...data,
      id: randomUUID(),
      artistId: data.artistId ?? null,
      albumId: data.albumId ?? null,
    };

    this.entityById.set(track.id, track);
    return track;
  }
}
