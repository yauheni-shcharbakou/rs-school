import { Inject, Injectable } from '@nestjs/common';
import { IArtist, IArtistCreate } from '../../models/artist.model';
import { BaseService } from '../../services/base.service';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { IAlbumRepository } from '../repository/album/album.repository.interface';
import { ARTIST_REPOSITORY } from '../repository/artist/artist.repository.constants';
import { IArtistRepository } from '../repository/artist/artist.repository.interface';
import { FAVORITES_REPOSITORY } from '../repository/favorites/favorites.repository.constants';
import { IFavoritesRepository } from '../repository/favorites/favorites.repository.interface';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ITrackRepository } from '../repository/track/track.repository.interface';

@Injectable()
export class ArtistService extends BaseService<IArtist, IArtistCreate> {
  constructor(
    @Inject(ARTIST_REPOSITORY)
    protected readonly repository: IArtistRepository,
    @Inject(TRACK_REPOSITORY)
    private readonly trackRepository: ITrackRepository,
    @Inject(ALBUM_REPOSITORY)
    private readonly albumRepository: IAlbumRepository,
    @Inject(FAVORITES_REPOSITORY)
    private readonly favoritesRepository: IFavoritesRepository,
  ) {
    super();
  }

  async updateById(id: string, data: IArtistCreate) {
    const errors = {
      notFound: false,
    };

    const artist = await this.repository.findById(id);

    if (!artist) {
      errors.notFound = true;
      return { errors };
    }

    const updatedArtist = await this.repository.updateById(artist.id, data);
    return { errors, updatedArtist };
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await super.deleteById(id);

    if (!result) {
      return result;
    }

    await Promise.all([
      this.trackRepository.updateMany({ artistId: id }, { artistId: null }),
      this.albumRepository.updateMany({ artistId: id }, { artistId: null }),
      this.favoritesRepository.deleteArtist(id),
    ]);

    return result;
  }
}
