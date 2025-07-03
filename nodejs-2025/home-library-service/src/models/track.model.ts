import { IIdField } from '../interfaces/id-field.interface';

export interface ITrack extends IIdField {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  favoritesId?: string;
}

export interface ITrackCreate
  extends Pick<ITrack, 'name' | 'duration' | 'artistId' | 'albumId'> {}

export interface ITrackFilter extends Partial<ITrackCreate> {}
