import { Inject, Injectable } from '@nestjs/common';
import { ITrack, ITrackCreate } from '../../models/track.model';
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
export class TrackService extends BaseService<ITrack, ITrackCreate> {
  constructor(
    @Inject(TRACK_REPOSITORY)
    protected readonly repository: ITrackRepository,
    @Inject(ALBUM_REPOSITORY)
    private readonly albumRepository: IAlbumRepository,
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

  private async validateAlbum(albumId: string | null) {
    if (!albumId) {
      return true;
    }

    return this.albumRepository.existsById(albumId);
  }

  async validateAndCreate(data: ITrackCreate) {
    const errors = {
      albumNotFound: false,
      artistNotFound: false,
    };

    const [isValidArtist, isValidAlbum] = await Promise.all([
      this.validateArtist(data.artistId),
      this.validateAlbum(data.albumId),
    ]);

    if (!isValidAlbum) {
      errors.albumNotFound = true;
      return { errors };
    }

    if (!isValidArtist) {
      errors.artistNotFound = true;
      return { errors };
    }

    const createdTrack = await super.create(data);
    return { errors, createdTrack };
  }

  async updateById(id: string, data: ITrackCreate) {
    const errors = {
      trackNotFound: false,
      albumNotFound: false,
      artistNotFound: false,
    };

    const [track, isValidArtist, isValidAlbum] = await Promise.all([
      this.repository.findById(id),
      this.validateArtist(data.artistId),
      this.validateAlbum(data.albumId),
    ]);

    if (!track) {
      errors.trackNotFound = true;
      return { errors };
    }

    if (!isValidAlbum) {
      errors.albumNotFound = true;
      return { errors };
    }

    if (!isValidArtist) {
      errors.artistNotFound = true;
      return { errors };
    }

    const updatedTrack = await this.repository.updateById(track.id, data);
    return { errors, updatedTrack };
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await super.deleteById(id);

    if (!result) {
      return result;
    }

    await this.favoritesRepository.deleteTrack(id);
    return result;
  }
}
