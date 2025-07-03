import { Inject, Injectable } from '@nestjs/common';
import { IFavorites } from '../../models/favorites.model';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { IAlbumRepository } from '../repository/album/album.repository.interface';
import { ARTIST_REPOSITORY } from '../repository/artist/artist.repository.constants';
import { IArtistRepository } from '../repository/artist/artist.repository.interface';
import { FAVORITES_REPOSITORY } from '../repository/favorites/favorites.repository.constants';
import { IFavoritesRepository } from '../repository/favorites/favorites.repository.interface';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ITrackRepository } from '../repository/track/track.repository.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FAVORITES_REPOSITORY)
    protected readonly favoritesRepository: IFavoritesRepository,
    @Inject(TRACK_REPOSITORY)
    private readonly trackRepository: ITrackRepository,
    @Inject(ARTIST_REPOSITORY)
    private readonly artistRepository: IArtistRepository,
    @Inject(ALBUM_REPOSITORY)
    private readonly albumRepository: IAlbumRepository,
  ) {}

  async find(): Promise<IFavorites> {
    return this.favoritesRepository.find();
  }

  async addAlbum(albumId: string) {
    const album = await this.albumRepository.findById(albumId);

    if (!album) {
      return false;
    }

    await this.favoritesRepository.add({ album });
    return true;
  }

  async addArtist(artistId: string) {
    const artist = await this.artistRepository.findById(artistId);

    if (!artist) {
      return false;
    }

    await this.favoritesRepository.add({ artist });
    return true;
  }

  async addTrack(trackId: string) {
    const track = await this.trackRepository.findById(trackId);

    if (!track) {
      return false;
    }

    await this.favoritesRepository.add({ track });
    return true;
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    return this.favoritesRepository.deleteAlbum(albumId);
  }

  async deleteArtist(artistId: string): Promise<boolean> {
    return this.favoritesRepository.deleteArtist(artistId);
  }

  async deleteTrack(trackId: string): Promise<boolean> {
    return this.favoritesRepository.deleteTrack(trackId);
  }
}
