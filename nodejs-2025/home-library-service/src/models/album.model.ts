import { IIdField } from '../interfaces/id-field.interface';

export interface IAlbum extends IIdField {
  name: string;
  year: number;
  artistId: string | null;
  favoritesId?: string;
}

export interface IAlbumCreate
  extends Pick<IAlbum, 'name' | 'year' | 'artistId'> {}

export interface IAlbumFilter extends Partial<IAlbumCreate> {}
