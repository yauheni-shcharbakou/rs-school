import { IIdField } from '../interfaces/id-field.interface';

export interface IArtist extends IIdField {
  name: string;
  grammy: boolean;
  favoritesId?: string;
}

export interface IArtistCreate extends Pick<IArtist, 'name' | 'grammy'> {}

export interface IArtistFilter extends Partial<IArtistCreate> {}
