import {
  IAlbum,
  IAlbumCreate,
  IAlbumFilter,
} from '../../../models/album.model';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IAlbumRepository
  extends IBaseRepository<IAlbum, IAlbumCreate, IAlbumFilter, IAlbumFilter> {}
