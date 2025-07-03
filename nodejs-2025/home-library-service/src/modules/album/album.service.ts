import { Inject, Injectable } from '@nestjs/common';
import { IAlbum, IAlbumCreate } from '../../models/album.model';
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
export class AlbumService extends BaseService<IAlbum, IAlbumCreate> {
  constructor(
    @Inject(ALBUM_REPOSITORY)
    protected readonly repository: IAlbumRepository,
    @Inject(TRACK_REPOSITORY)
    private readonly trackRepository: ITrackRepository,
    @Inject(ARTIST_REPOSITORY)
    private readonly artistRepository: IArtistRepository,
    @Inject(FAVORITES_REPOSITORY)
    private readonly favoritesRepository: IFavoritesRepository,
  ) {
    super();
  }

  private async validateArtist(artistId: string | null) {
    if (!artistId) {
      return true;
    }

    return this.artistRepository.existsById(artistId);
  }

  async validateAndCreate(data: IAlbumCreate) {
    const errors = {
      artistNotFound: false,
    };

    const isArtistValid = await this.validateArtist(data.artistId);

    if (!isArtistValid) {
      errors.artistNotFound = true;
      return { errors };
    }

    const createdAlbum = await super.create(data);
    return { errors, createdAlbum };
  }

  async updateById(id: string, data: IAlbumCreate) {
    const errors = {
      artistNotFound: false,
      albumNotFound: false,
    };

    const [isValidArtist, album] = await Promise.all([
      this.validateArtist(data.artistId),
      this.repository.findById(id),
    ]);

    if (!isValidArtist) {
      errors.artistNotFound = true;
      return { errors };
    }

    if (!album) {
      errors.albumNotFound = true;
      return { errors };
    }

    const updatedAlbum = await this.repository.updateById(id, data);

    if (data.artistId !== album.artistId) {
      await this.trackRepository.updateMany(
        { artistId: album.artistId },
        { albumId: data.artistId },
      );
    }

    return { errors, updatedAlbum };
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await super.deleteById(id);

    if (!result) {
      return result;
    }

    await Promise.all([
      this.trackRepository.updateMany({ albumId: id }, { albumId: null }),
      this.favoritesRepository.deleteAlbum(id),
    ]);

    return result;
  }
}
