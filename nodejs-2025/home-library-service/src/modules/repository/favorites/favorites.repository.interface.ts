import { IFavorites, IFavoritesAdd } from '../../../models/favorites.model';

export interface IFavoritesRepository {
  find(): Promise<IFavorites>;
  add(data: IFavoritesAdd): Promise<void>;
  deleteAlbum(albumId: string): Promise<boolean>;
  deleteArtist(artistId: string): Promise<boolean>;
  deleteTrack(trackId: string): Promise<boolean>;
}
