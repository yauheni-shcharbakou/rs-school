import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IAlbum } from '../../../models/album.model';
import { IArtist } from '../../../models/artist.model';
import { ITrack } from '../../../models/track.model';
import { IFavoritesRepository } from './favorites.repository.interface';
import { IFavorites, IFavoritesAdd } from 'src/models/favorites.model';

@Injectable()
export class FavoritesInMemoryRepository implements IFavoritesRepository {
  private readonly id = randomUUID();
  private readonly albumById = new Map<string, IAlbum>();
  private readonly artistById = new Map<string, IArtist>();
  private readonly trackById = new Map<string, ITrack>();

  async find(): Promise<IFavorites> {
    return {
      id: this.id,
      albums: Array.from(this.albumById.values()),
      artists: Array.from(this.artistById.values()),
      tracks: Array.from(this.trackById.values()),
    };
  }

  async add(data: IFavoritesAdd): Promise<void> {
    if (data.album && !this.albumById.has(data.album.id)) {
      this.albumById.set(data.album.id, data.album);
    }

    if (data.artist && !this.artistById.has(data.artist.id)) {
      this.artistById.set(data.artist.id, data.artist);
    }

    if (data.track && !this.trackById.has(data.track.id)) {
      this.trackById.set(data.track.id, data.track);
    }
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    if (!this.albumById.has(albumId)) {
      return false;
    }

    this.albumById.delete(albumId);
    return true;
  }

  async deleteArtist(artistId: string): Promise<boolean> {
    if (!this.artistById.has(artistId)) {
      return false;
    }

    this.artistById.delete(artistId);
    return true;
  }

  async deleteTrack(trackId: string): Promise<boolean> {
    if (!this.trackById.has(trackId)) {
      return false;
    }

    this.trackById.delete(trackId);
    return true;
  }
}
