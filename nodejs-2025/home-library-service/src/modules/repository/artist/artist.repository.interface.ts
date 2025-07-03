import {
  IArtist,
  IArtistCreate,
  IArtistFilter,
} from '../../../models/artist.model';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IArtistRepository
  extends IBaseRepository<
    IArtist,
    IArtistCreate,
    IArtistFilter,
    IArtistFilter
  > {}
