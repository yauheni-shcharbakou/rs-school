import { Injectable } from '@nestjs/common';
import {
  IArtist,
  IArtistCreate,
  IArtistFilter,
} from '../../../models/artist.model';
import { BaseInMemoryRepository } from '../base/base.in-memory.repository';
import { IArtistRepository } from './artist.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistInMemoryRepository
  extends BaseInMemoryRepository<
    IArtist,
    IArtistCreate,
    IArtistFilter,
    IArtistFilter
  >
  implements IArtistRepository
{
  async create(data: IArtistCreate): Promise<IArtist> {
    const artist: IArtist = { ...data, id: randomUUID() };
    this.entityById.set(artist.id, artist);
    return artist;
  }
}
